import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfessionalProfile, StepProps } from '@/types/form';
import { professionalSchema } from '@/utils/validation';
import { formOptions } from '@/utils/formOptions';
import { useDebouncedFormUpdates } from '@/hooks/useDebouncedFormUpdates';
import FormField from '@/components/ui/FormField';
import MultiSelect from '@/components/ui/MultiSelect';
import MultiSelectWithOther from '@/components/ui/MultiSelectWithOther';
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
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isValid }
  } = useForm<ProfessionalProfile>({
    resolver: zodResolver(professionalSchema),
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
    setValue('expertiseAreas', data.expertiseAreas || []);
    setValue('expertiseAreasOther', data.expertiseAreasOther || '');
    setValue('rolesHeld', data.rolesHeld || []);
    setValue('rolesHeldOther', data.rolesHeldOther || '');
    setValue('digitalHealthPlatforms', data.digitalHealthPlatforms || []);
    setValue('digitalHealthPlatformsOther', data.digitalHealthPlatformsOther || '');
    setValue('languages', data.languages || []);
    setValue('languagesOther', data.languagesOther || '');
    setValue('certifications', data.certifications || []);
    setValue('certificationsOther', data.certificationsOther || '');
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
            onChange={(selected) => {
              setValue('expertiseAreas', selected);
              trigger('expertiseAreas');
            }}
            maxSelections={3}
            showOrder={true}
            className="mt-2"
          />
        </FormField>

        {/* Other Expertise Areas */}
        {watchedValues.expertiseAreas?.includes('Other') && (
          <FormField
            label="Please specify your other expertise area"
            required
            error={errors.expertiseAreasOther?.message}
          >
            <input
              {...register('expertiseAreasOther')}
              type="text"
              className="form-input"
              placeholder="e.g., Blockchain, IoT"
            />
          </FormField>
        )}

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
            onChange={(selected) => {
              setValue('rolesHeld', selected);
              trigger('rolesHeld');
            }}
            maxSelections={3}
            showOrder={true}
            className="mt-2"
          />
        </FormField>

        {/* Other Roles */}
        {watchedValues.rolesHeld?.includes('Other') && (
          <FormField
            label="Please specify your other role"
            required
            error={errors.rolesHeldOther?.message}
          >
            <input
              {...register('rolesHeldOther')}
              type="text"
              className="form-input"
              placeholder="e.g., Innovation Manager, Community Coordinator"
            />
          </FormField>
        )}

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
            onChange={(selected) => {
              setValue('digitalHealthPlatforms', selected);
              trigger('digitalHealthPlatforms');
            }}
            className="mt-2"
          />
        </FormField>

        {/* Other Digital Health Platforms */}
        {watchedValues.digitalHealthPlatforms?.includes('Other') && (
          <FormField
            label="Please specify the platform"
            required
            error={errors.digitalHealthPlatformsOther?.message}
          >
            <input
              {...register('digitalHealthPlatformsOther')}
              type="text"
              className="form-input"
              placeholder="e.g., Epic, Cerner, Allscripts"
            />
          </FormField>
        )}

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
            onChange={(selected) => {
              setValue('languages', selected);
              trigger('languages');
            }}
            className="mt-2"
          />
        </FormField>

        {/* Other Languages */}
        {watchedValues.languages?.includes('Other') && (
          <FormField
            label="Please specify the language"
            required
            error={errors.languagesOther?.message}
          >
            <input
              {...register('languagesOther')}
              type="text"
              className="form-input"
              placeholder="e.g., German (fluent), Mandarin (conversational)"
            />
          </FormField>
        )}

        {/* Professional Certifications */}
        <FormField
          label="Professional certifications"
          error={errors.certifications?.message}
          hint="Select any professional certifications you hold (optional)"
        >
          <MultiSelect
            options={formOptions.certifications}
            selected={watchedValues.certifications || []}
            onChange={(selected) => {
              setValue('certifications', selected);
              trigger('certifications');
            }}
            className="mt-2"
          />
        </FormField>

        {/* Other Certifications */}
        {watchedValues.certifications?.includes('Other') && (
          <FormField
            label="Please specify the certification"
            required
            error={errors.certificationsOther?.message}
          >
            <input
              {...register('certificationsOther')}
              type="text"
              className="form-input"
              placeholder="e.g., PRINCE2, Agile, PMI"
            />
          </FormField>
        )}

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