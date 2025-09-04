import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AvailabilityEngagement, StepProps } from '@/types/form';
import { availabilitySchema } from '@/utils/validation';
import { formOptions } from '@/utils/formOptions';
import FormField from '@/components/ui/FormField';
import StepNavigation from '@/components/ui/StepNavigation';

interface Step6AvailabilityProps extends StepProps {
  data: AvailabilityEngagement;
  onUpdate: (data: AvailabilityEngagement) => void;
}

const Step6Availability: React.FC<Step6AvailabilityProps> = ({
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
  } = useForm<AvailabilityEngagement>({
    resolver: zodResolver(availabilitySchema),
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
      setValue(key as keyof AvailabilityEngagement, data[key as keyof AvailabilityEngagement]);
    });
  }, [data, setValue]);

  const onSubmit = () => {
    if (isValid) onNext();
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl font-display font-bold text-madiro-primary mb-2">
          Availability & Engagement
        </h2>
        <p className="text-gray-600">
          Help us understand your availability, rates, and preferences for project engagements. 
          This information helps us match you with suitable opportunities.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          label="Preferred hourly rate range (USD)"
          required
          error={errors.preferredHourlyRate?.message}
          hint="e.g., $75-100 or $50-75"
        >
          <input
            {...register('preferredHourlyRate')}
            type="text"
            className="form-input"
            placeholder="$75-100"
          />
        </FormField>

        <FormField
          label="Minimum acceptable hourly rate (USD)"
          required
          error={errors.minimumHourlyRate?.message}
          hint="The lowest hourly rate you would accept"
        >
          <input
            {...register('minimumHourlyRate')}
            type="text"
            className="form-input"
            placeholder="$50"
          />
        </FormField>

        <FormField
          label="Typical weekly availability for contract work"
          required
          error={errors.weeklyAvailability?.message}
        >
          <select {...register('weeklyAvailability')} className="form-select">
            <option value="">Select your availability</option>
            {formOptions.availabilityRanges.map((range) => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </FormField>

        <FormField
          label="Anticipated unavailable periods (next six months)"
          error={errors.unavailablePeriods?.message}
          hint="e.g., 'August 15-30 (vacation), December 20-January 5 (holidays)'"
        >
          <textarea
            {...register('unavailablePeriods')}
            className="form-textarea"
            placeholder="August 15-30 (vacation), December 20-January 5 (holidays)"
            rows={3}
          />
        </FormField>

        <FormField
          label="Location of remote work (city / country, timezone)"
          required
          error={errors.remoteLocation?.message}
          hint="e.g., 'San Francisco, USA (PST)' or 'Nairobi, Kenya (EAT)'"
        >
          <input
            {...register('remoteLocation')}
            type="text"
            className="form-input"
            placeholder="San Francisco, USA (PST)"
          />
        </FormField>

        <FormField
          label="Willingness to travel for assignments"
          required
          error={errors.travelWillingness?.message}
        >
          <div className="space-y-3">
            {formOptions.travelOptions.map((option) => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer">
                <input
                  {...register('travelWillingness')}
                  type="radio"
                  value={option}
                  className="form-checkbox"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </FormField>

        <FormField
          label="Maximum duration of assignments you would accept"
          required
          error={errors.maxAssignmentDuration?.message}
        >
          <div className="space-y-3">
            {formOptions.durationOptions.map((option) => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer">
                <input
                  {...register('maxAssignmentDuration')}
                  type="radio"
                  value={option}
                  className="form-checkbox"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
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

export default Step6Availability;