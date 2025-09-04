import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfessionalProfile, StepProps } from '@/types/form';
import { professionalSchema } from '@/utils/validation';
import { formOptions } from '@/utils/formOptions';
import FormField from '@/components/ui/FormField';
import MultiSelect from '@/components/ui/MultiSelect';
import StepNavigation from '@/components/ui/StepNavigation';

interface Step4ProfessionalProps extends StepProps {
  data: ProfessionalProfile;
  onUpdate: (data: ProfessionalProfile) => void;
}

const Step4Professional: React.FC<Step4ProfessionalProps> = ({
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
  } = useForm<ProfessionalProfile>({
    resolver: zodResolver(professionalSchema),
    defaultValues: data,
    mode: 'onChange'
  });

  const watchedValues = watch();

  // Update parent component when form data changes
  useEffect(() => {
    onUpdate(watchedValues);
  }, [watchedValues, onUpdate]);

  // Update proceed state based on form validity
  useEffect(() => {
    setCanProceed(isValid);
  }, [isValid]);

  // Set initial values when data prop changes
  useEffect(() => {
    setValue('expertiseAreas', data.expertiseAreas || []);
    setValue('rolesHeld', data.rolesHeld || []);
    setValue('digitalHealthPlatforms', data.digitalHealthPlatforms || []);
    setValue('languages', data.languages || []);
    setValue('certifications', data.certifications || []);
  }, [data, setValue]);

  const onSubmit = () => {
    if (isValid) {
      onNext();
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Step Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-display font-bold text-madiro-primary mb-2">
          Professional Profile
        </h2>
        <p className="text-gray-600">
          Tell us about your technical expertise, professional roles, and the digital health 
          platforms you've worked with. This helps us match you with the right opportunities.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Top 3 Expertise Areas */}
        <FormField
          label="Top three areas of expertise"
          required
          error={errors.expertiseAreas?.message}
          hint="Select up to 3 areas where you have the strongest skills and experience"
        >
          <MultiSelect
            options={formOptions.expertiseAreas}
            selected={watchedValues.expertiseAreas || []}
            onChange={(selected) => setValue('expertiseAreas', selected)}
            maxSelections={3}
            className="mt-2"
          />
        </FormField>

        {/* Top 3 Roles */}
        <FormField
          label="Top three roles you have held"
          required
          error={errors.rolesHeld?.message}
          hint="Select up to 3 professional roles that best describe your work experience"
        >
          <MultiSelect
            options={formOptions.roleTypes}
            selected={watchedValues.rolesHeld || []}
            onChange={(selected) => setValue('rolesHeld', selected)}
            maxSelections={3}
            className="mt-2"
          />
        </FormField>

        {/* Digital Health Platforms */}
        <FormField
          label="Digital health platforms / tools you have experience with"
          required
          error={errors.digitalHealthPlatforms?.message}
          hint="Select all platforms and tools you've worked with professionally"
        >
          <MultiSelect
            options={formOptions.digitalPlatforms}
            selected={watchedValues.digitalHealthPlatforms || []}
            onChange={(selected) => setValue('digitalHealthPlatforms', selected)}
            className="mt-2"
          />
        </FormField>

        {/* Languages */}
        <FormField
          label="Languages spoken"
          required
          error={errors.languages?.message}
          hint="Select all languages you speak fluently enough to work professionally"
        >
          <MultiSelect
            options={formOptions.languages}
            selected={watchedValues.languages || []}
            onChange={(selected) => setValue('languages', selected)}
            className="mt-2"
          />
        </FormField>

        {/* Professional Certifications */}
        <FormField
          label="Professional certifications"
          error={errors.certifications?.message}
          hint="Select any professional certifications you hold (optional)"
        >
          <MultiSelect
            options={formOptions.certifications}
            selected={watchedValues.certifications || []}
            onChange={(selected) => setValue('certifications', selected)}
            className="mt-2"
          />
        </FormField>

        {/* Show summary if multiple selections made */}
        {(watchedValues.expertiseAreas?.length > 0 || watchedValues.rolesHeld?.length > 0) && (
          <div className="bg-gray-50 rounded-lg p-4 border">
            <h4 className="font-medium text-madiro-primary mb-3">Your Professional Profile Summary</h4>
            <div className="space-y-2 text-sm">
              {watchedValues.expertiseAreas?.length > 0 && (
                <div>
                  <span className="font-medium">Expertise:</span> {watchedValues.expertiseAreas.join(', ')}
                </div>
              )}
              {watchedValues.rolesHeld?.length > 0 && (
                <div>
                  <span className="font-medium">Roles:</span> {watchedValues.rolesHeld.join(', ')}
                </div>
              )}
              {watchedValues.languages?.length > 0 && (
                <div>
                  <span className="font-medium">Languages:</span> {watchedValues.languages.join(', ')}
                </div>
              )}
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

export default Step4Professional;