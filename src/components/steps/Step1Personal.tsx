import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PersonalInformation, StepProps } from '@/types/form';
import { personalSchema } from '@/utils/validation';
import { formOptions } from '@/utils/formOptions';
import FormField from '@/components/ui/FormField';
import StepNavigation from '@/components/ui/StepNavigation';

interface Step1PersonalProps extends StepProps {
  data: PersonalInformation;
  onUpdate: (data: PersonalInformation) => void;
}

const Step1Personal: React.FC<Step1PersonalProps> = ({
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
    formState: { errors, isValid }
  } = useForm<PersonalInformation>({
    resolver: zodResolver(personalSchema),
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
    Object.keys(data).forEach((key) => {
      setValue(key as keyof PersonalInformation, data[key as keyof PersonalInformation]);
    });
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
          Personal Information
        </h2>
        <p className="text-gray-600">
          Let's start with your basic information. This helps us understand your background and location.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Full Name */}
        <FormField
          label="Full Name"
          required
          error={errors.fullName?.message}
        >
          <input
            {...register('fullName')}
            type="text"
            className="form-input"
            placeholder="Dr. Jane Smith"
            autoComplete="name"
          />
        </FormField>

        {/* Email Address */}
        <FormField
          label="Email Address"
          required
          error={errors.email?.message}
          hint="We'll use this for important updates about roster opportunities"
        >
          <input
            {...register('email')}
            type="email"
            className="form-input"
            placeholder="jane.smith@example.com"
            autoComplete="email"
          />
        </FormField>

        {/* Phone / WhatsApp (Optional) */}
        <FormField
          label="Phone / WhatsApp"
          error={errors.phone?.message}
          hint="Including country code (e.g., +1 555 123 4567)"
        >
          <input
            {...register('phone')}
            type="tel"
            className="form-input"
            placeholder="+1 555 123 4567"
            autoComplete="tel"
          />
        </FormField>

        {/* Country of Residence */}
        <FormField
          label="Country of Residence"
          required
          error={errors.country?.message}
          hint="This helps us understand your timezone and regional expertise"
        >
          <select
            {...register('country')}
            className="form-select"
          >
            <option value="">Select your country</option>
            {formOptions.countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
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

export default Step1Personal;