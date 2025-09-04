import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EducationExperience, StepProps } from '@/types/form';
import { educationSchema } from '@/utils/validation';
import { formOptions } from '@/utils/formOptions';
import { useDebouncedFormUpdates } from '@/hooks/useDebouncedFormUpdates';
import FormField from '@/components/ui/FormField';
import StepNavigation from '@/components/ui/StepNavigation';

interface Step2EducationProps extends StepProps {
  data: EducationExperience;
  onUpdate: (data: EducationExperience) => void;
}

const Step2Education: React.FC<Step2EducationProps> = ({
  data,
  onUpdate,
  onNext,
  onBack,
  isFirst,
  isLast
}) => {
  const [canProceed, setCanProceed] = useState(false);
  const [showOtherEducation, setShowOtherEducation] = useState(false);
  const [showOtherField, setShowOtherField] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<EducationExperience>({
    resolver: zodResolver(educationSchema),
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
    Object.keys(data).forEach((key) => {
      setValue(key as keyof EducationExperience, data[key as keyof EducationExperience]);
    });
  }, [data, setValue]);

  // Handle "Other" option visibility
  useEffect(() => {
    setShowOtherEducation(watchedValues.highestEducation === 'Other');
    setShowOtherField(watchedValues.fieldOfStudy === 'Other');
  }, [watchedValues.highestEducation, watchedValues.fieldOfStudy]);

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
          Education & Experience
        </h2>
        <p className="text-gray-600">
          Tell us about your educational background and professional experience in digital health and ICT4D.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Highest Education */}
        <FormField
          label="Highest completed education"
          required
          error={errors.highestEducation?.message}
        >
          <select
            {...register('highestEducation')}
            className="form-select"
          >
            <option value="">Select your highest education level</option>
            {formOptions.educationLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </FormField>

        {/* Other Education - Show if "Other" is selected */}
        {showOtherEducation && (
          <FormField
            label="Please specify your education level"
            required
          >
            <input
              {...register('highestEducation')}
              type="text"
              className="form-input"
              placeholder="e.g., Professional Certificate, Bootcamp"
            />
          </FormField>
        )}

        {/* Field of Study */}
        <FormField
          label="Main field of study"
          required
          error={errors.fieldOfStudy?.message}
          hint="Choose the field most closely related to your education"
        >
          <select
            {...register('fieldOfStudy')}
            className="form-select"
          >
            <option value="">Select your field of study</option>
            {formOptions.fieldsOfStudy.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>
        </FormField>

        {/* Other Field - Show if "Other" is selected */}
        {showOtherField && (
          <FormField
            label="Please specify your field of study"
            required
          >
            <input
              {...register('fieldOfStudy')}
              type="text"
              className="form-input"
              placeholder="e.g., Biomedical Engineering, Business Administration"
            />
          </FormField>
        )}

        {/* Years of Experience */}
        <FormField
          label="Years of professional experience in digital health / ICT4D"
          required
          error={errors.yearsExperience?.message}
          hint="Include experience in healthcare technology, health informatics, or ICT for development"
        >
          <select
            {...register('yearsExperience')}
            className="form-select"
          >
            <option value="">Select your experience range</option>
            {formOptions.experienceRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </FormField>

        {/* Level of Contribution / Seniority */}
        <FormField
          label="Level of contribution / seniority"
          required
          error={errors.contributionLevel?.message}
          hint="How do you typically work on projects? This helps us match you with appropriate opportunities."
        >
          <div className="space-y-3">
            {formOptions.contributionLevels.map((level) => (
              <label key={level} className="flex items-start space-x-3 p-3 border rounded-lg cursor-pointer hover:border-gray-400">
                <input
                  {...register('contributionLevel')}
                  type="radio"
                  value={level}
                  className="mt-1"
                />
                <span className="text-sm text-gray-700 leading-relaxed">
                  {level}
                </span>
              </label>
            ))}
          </div>
        </FormField>

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

export default Step2Education;