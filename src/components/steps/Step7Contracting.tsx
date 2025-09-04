import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContractingCompliance, StepProps } from '@/types/form';
import { contractingSchema } from '@/utils/validation';
import { formOptions } from '@/utils/formOptions';
import FormField from '@/components/ui/FormField';
import StepNavigation from '@/components/ui/StepNavigation';

interface Step7ContractingProps extends StepProps {
  data: ContractingCompliance;
  onUpdate: (data: ContractingCompliance) => void;
}

const Step7Contracting: React.FC<Step7ContractingProps> = ({
  data,
  onUpdate,
  onNext,
  onBack,
  isFirst,
  isLast
}) => {
  const [canProceed, setCanProceed] = useState(false);
  const [showOtherModality, setShowOtherModality] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<ContractingCompliance>({
    resolver: zodResolver(contractingSchema),
    defaultValues: data,
    mode: 'onChange'
  });

  const watchedValues = watch();

  useEffect(() => {
    onUpdate(watchedValues);
  }, [watchedValues, onUpdate]);

  useEffect(() => {
    setCanProceed(isValid);
  }, [isValid]);

  useEffect(() => {
    Object.keys(data).forEach((key) => {
      setValue(key as keyof ContractingCompliance, data[key as keyof ContractingCompliance]);
    });
  }, [data, setValue]);

  useEffect(() => {
    setShowOtherModality(watchedValues.contractingModality === 'Other');
  }, [watchedValues.contractingModality]);

  const onSubmit = () => {
    if (isValid) onNext();
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl font-display font-bold text-madiro-primary mb-2">
          Contracting & Compliance
        </h2>
        <p className="text-gray-600">
          Help us understand your legal status and any restrictions for international consulting work. 
          This ensures we can match you with appropriate opportunities.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          label="Preferred contracting modality"
          required
          error={errors.contractingModality?.message}
          hint="How do you typically structure your consulting engagements?"
        >
          <div className="space-y-3">
            {formOptions.contractingOptions.map((option) => (
              <label key={option} className="flex items-start space-x-3 p-3 border rounded-lg cursor-pointer hover:border-gray-400">
                <input
                  {...register('contractingModality')}
                  type="radio"
                  value={option}
                  className="mt-1"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </FormField>

        {showOtherModality && (
          <FormField
            label="Please specify your contracting modality"
            required
          >
            <input
              {...register('contractingModality')}
              type="text"
              className="form-input"
              placeholder="e.g., Partnership, Cooperative"
            />
          </FormField>
        )}

        <FormField
          label="Legal ability to contract with international NGOs"
          required
          error={errors.internationalContracting?.message}
          hint="Can you legally provide services to international organizations?"
        >
          <div className="space-y-3">
            {formOptions.legalOptions.map((option) => (
              <label key={option} className="flex items-start space-x-3 p-3 border rounded-lg cursor-pointer hover:border-gray-400">
                <input
                  {...register('internationalContracting')}
                  type="radio"
                  value={option}
                  className="mt-1"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </FormField>

        {watchedValues.internationalContracting === 'Not sure' && (
          <div className="bg-madiro-warning/10 border border-madiro-warning/20 rounded-lg p-4">
            <div className="flex">
              <svg className="w-5 h-5 text-madiro-warning mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div className="text-sm text-madiro-neutral">
                <p className="font-medium mb-1">Legal Status Clarification Needed</p>
                <p>We recommend consulting with a tax professional or legal advisor about your ability to provide services internationally. 
                We can also provide guidance on common approaches used by consultants in your region.</p>
              </div>
            </div>
          </div>
        )}

        <FormField
          label="Any restrictions on working with specific countries/funders?"
          error={errors.workRestrictions?.message}
          hint="Optional: Note any legal, personal, or professional restrictions (e.g., visa limitations, conflict of interest)"
        >
          <textarea
            {...register('workRestrictions')}
            className="form-textarea"
            placeholder="e.g., Cannot work in countries X, Y due to visa restrictions"
            rows={3}
          />
        </FormField>

        {/* Legal Notice */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-xs text-gray-600">
          <h4 className="font-medium text-gray-700 mb-2">Legal Notice:</h4>
          <p>
            This information helps us match you with appropriate opportunities. Final contracting arrangements 
            will be determined between you and the hiring organization, subject to applicable laws and regulations 
            in your jurisdiction and the organization's location.
          </p>
        </div>

        <StepNavigation
          onBack={onBack}
          onNext={onSubmit}
          isFirst={isFirst}
          isLast={isLast}
          canProceed={canProceed}
        />
      </form>
    </div>
  );
};

export default Step7Contracting;