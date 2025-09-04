import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NGOExperience, StepProps } from '@/types/form';
import { ngoSchema } from '@/utils/validation';
import { formOptions } from '@/utils/formOptions';
import { useDebouncedFormUpdates } from '@/hooks/useDebouncedFormUpdates';
import FormField from '@/components/ui/FormField';
import MultiSelect from '@/components/ui/MultiSelect';
import StepNavigation from '@/components/ui/StepNavigation';

interface Step3NGOProps extends StepProps {
  data: NGOExperience;
  onUpdate: (data: NGOExperience) => void;
}

const Step3NGO: React.FC<Step3NGOProps> = ({
  data,
  onUpdate,
  onNext,
  onBack,
  isFirst,
  isLast
}) => {
  const [canProceed, setCanProceed] = useState(false);

  const {
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isValid }
  } = useForm<NGOExperience>({
    resolver: zodResolver(ngoSchema),
    defaultValues: data,
    mode: 'onChange'
  });

  const watchedValues = watch();
  const { debouncedUpdate, forceUpdate } = useDebouncedFormUpdates(onUpdate);

  // Update parent component when form data changes (debounced)
  useEffect(() => {
    debouncedUpdate(watchedValues);
  }, [watchedValues, debouncedUpdate]);

  // Update proceed state based on form validity
  useEffect(() => {
    setCanProceed(isValid);
  }, [isValid]);

  // Set initial values when data prop changes
  useEffect(() => {
    setValue('organizationTypes', data.organizationTypes || []);
    setValue('lmicExperience', data.lmicExperience || '');
  }, [data, setValue]);

  const onSubmit = () => {
    if (isValid) {
      forceUpdate(watchedValues);
      onNext();
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Step Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-display font-bold text-madiro-primary mb-2">
          NGO & Humanitarian Experience
        </h2>
        <p className="text-gray-600">
          Help us understand your experience working with NGOs, international organizations, 
          and in humanitarian or development contexts.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Organization Types */}
        <FormField
          label="Have you previously worked with any of the following?"
          required
          error={errors.organizationTypes?.message}
          hint="Select all that apply to your experience"
        >
          <MultiSelect
            options={formOptions.organizationTypes}
            selected={watchedValues.organizationTypes || []}
            onChange={(selected) => {
              setValue('organizationTypes', selected);
              trigger('organizationTypes');
            }}
            className="mt-2"
          />
        </FormField>

        {/* LMIC Experience */}
        <FormField
          label="Have you worked in low- or middle-income countries (LMICs) or humanitarian settings?"
          required
          error={errors.lmicExperience?.message}
          hint="This includes work in countries classified as LMICs by the World Bank, or in emergency/humanitarian contexts"
        >
          <div className="space-y-3 mt-3">
            {formOptions.lmicOptions.map((option) => (
              <label 
                key={option} 
                className={`
                  flex items-start space-x-3 p-3 border rounded-lg cursor-pointer
                  transition-all duration-200
                  ${watchedValues.lmicExperience === option 
                    ? 'bg-madiro-primary/5 border-madiro-primary' 
                    : 'bg-white border-gray-300 hover:border-gray-400'
                  }
                `}
              >
                <input
                  type="radio"
                  name="lmicExperience"
                  value={option}
                  checked={watchedValues.lmicExperience === option}
                  onChange={(e) => {
                    setValue('lmicExperience', e.target.value);
                    trigger('lmicExperience');
                  }}
                  className="mt-1"
                />
                <span className={`text-sm leading-relaxed ${
                  watchedValues.lmicExperience === option 
                    ? 'text-madiro-primary font-medium' 
                    : 'text-gray-700'
                }`}>
                  {option}
                </span>
              </label>
            ))}
          </div>
        </FormField>

        {/* Additional Context Based on Selection */}
        {watchedValues.lmicExperience === 'Not yet, but interested' && (
          <div className="bg-madiro-accent/10 border border-madiro-accent/20 rounded-lg p-4">
            <div className="flex">
              <svg className="w-5 h-5 text-madiro-accent mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div className="text-sm text-madiro-neutral">
                <p className="font-medium mb-1">Great! We work with many first-time humanitarian consultants.</p>
                <p>Madiro provides opportunities to gain experience in LMIC and humanitarian settings. 
                We often have mentorship programs and entry-level positions available.</p>
              </div>
            </div>
          </div>
        )}

        {watchedValues.organizationTypes?.includes('None yet, but interested') && (
          <div className="bg-madiro-secondary/10 border border-madiro-secondary/20 rounded-lg p-4">
            <div className="flex">
              <svg className="w-5 h-5 text-madiro-secondary mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <div className="text-sm text-madiro-neutral">
                <p className="font-medium mb-1">Welcome to the NGO/humanitarian sector!</p>
                <p>Many of our roster members started their humanitarian careers through Madiro. 
                We'll help match you with organizations that welcome fresh talent and provide good onboarding.</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
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

export default Step3NGO;