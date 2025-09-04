import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OpenSourceEntrepreneurship, StepProps } from '@/types/form';
import { openSourceSchema } from '@/utils/validation';
import { formOptions } from '@/utils/formOptions';
import { useDebouncedFormUpdates } from '@/hooks/useDebouncedFormUpdates';
import FormField from '@/components/ui/FormField';
import MultiSelect from '@/components/ui/MultiSelect';
import StepNavigation from '@/components/ui/StepNavigation';

interface Step5OpenSourceProps extends StepProps {
  data: OpenSourceEntrepreneurship;
  onUpdate: (data: OpenSourceEntrepreneurship) => void;
}

const Step5OpenSource: React.FC<Step5OpenSourceProps> = ({
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
    formState: { errors, isValid }
  } = useForm<OpenSourceEntrepreneurship>({
    resolver: zodResolver(openSourceSchema),
    defaultValues: data,
    mode: 'onChange'
  });

  const watchedValues = watch();
  const { debouncedUpdate, forceUpdate } = useDebouncedFormUpdates(onUpdate);

  useEffect(() => {
    debouncedUpdate(watchedValues);
  }, [watchedValues, debouncedUpdate]);

  useEffect(() => {
    setCanProceed(isValid);
  }, [isValid]);

  useEffect(() => {
    setValue('openSourcePlatforms', data.openSourcePlatforms || []);
    setValue('openSourceContributions', data.openSourceContributions || '');
    setValue('startupExperience', data.startupExperience || '');
    setValue('problemSolvingApproach', data.problemSolvingApproach || []);
  }, [data, setValue]);

  const onSubmit = () => {
    if (isValid) {
      forceUpdate(watchedValues);
      onNext();
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl font-display font-bold text-madiro-primary mb-2">
          Open Source & Entrepreneurship
        </h2>
        <p className="text-gray-600">
          Tell us about your involvement with open-source projects and entrepreneurial experience. 
          This helps us understand your approach to collaborative development and innovation.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          label="Which open-source digital health platforms or tools have you contributed to or worked with?"
          required
          error={errors.openSourcePlatforms?.message}
        >
          <MultiSelect
            options={formOptions.openSourcePlatforms}
            selected={watchedValues.openSourcePlatforms || []}
            onChange={(selected) => setValue('openSourcePlatforms', selected)}
          />
        </FormField>

        <FormField
          label="Have you contributed to open-source communities?"
          required
          error={errors.openSourceContributions?.message}
        >
          <div className="space-y-3">
            {formOptions.openSourceContributionLevels.map((level) => (
              <label key={level} className="flex items-start space-x-3 p-3 border rounded-lg cursor-pointer hover:border-gray-400">
                <input
                  type="radio"
                  name="openSourceContributions"
                  value={level}
                  checked={watchedValues.openSourceContributions === level}
                  onChange={(e) => setValue('openSourceContributions', e.target.value)}
                />
                <span className="text-sm text-gray-700">{level}</span>
              </label>
            ))}
          </div>
        </FormField>

        <FormField
          label="Have you founded, co-founded, or worked in a startup, social enterprise, or innovation project?"
          required
          error={errors.startupExperience?.message}
        >
          <div className="space-y-3">
            {formOptions.startupOptions.map((option) => (
              <label key={option} className="flex items-start space-x-3 p-3 border rounded-lg cursor-pointer hover:border-gray-400">
                <input
                  type="radio"
                  name="startupExperience"
                  value={option}
                  checked={watchedValues.startupExperience === option}
                  onChange={(e) => setValue('startupExperience', e.target.value)}
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </FormField>

        <FormField
          label="Problem-solving approach"
          required
          error={errors.problemSolvingApproach?.message}
        >
          <MultiSelect
            options={formOptions.problemSolvingApproaches}
            selected={watchedValues.problemSolvingApproach || []}
            onChange={(selected) => setValue('problemSolvingApproach', selected)}
          />
        </FormField>

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

export default Step5OpenSource;