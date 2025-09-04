import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MotivationNotes, StepProps } from '@/types/form';
import { motivationSchema } from '@/utils/validation';
import { useDebouncedFormUpdates } from '@/hooks/useDebouncedFormUpdates';
import FormField from '@/components/ui/FormField';
import StepNavigation from '@/components/ui/StepNavigation';

interface Step8MotivationProps extends StepProps {
  data: MotivationNotes;
  onUpdate: (data: MotivationNotes) => void;
  onSubmit: (newsletterData: any) => void;
  isLoading: boolean;
}

const Step8Motivation: React.FC<Step8MotivationProps> = ({
  data,
  onUpdate,
  onBack,
  isFirst,
  isLast,
  onSubmit,
  isLoading
}) => {
  const [canProceed, setCanProceed] = useState(false);
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [dataProcessingConsent, setDataProcessingConsent] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<MotivationNotes>({
    resolver: zodResolver(motivationSchema),
    defaultValues: data,
    mode: 'onChange'
  });

  const watchedValues = watch();
  const { debouncedUpdate, forceUpdate } = useDebouncedFormUpdates(onUpdate, 200); // Slightly longer delay for textareas

  // Update parent component when form data changes (debounced)
  useEffect(() => {
    debouncedUpdate(watchedValues);
  }, [watchedValues, debouncedUpdate]);

  // Update proceed state based on form validity and consent
  useEffect(() => {
    setCanProceed(isValid && dataProcessingConsent);
  }, [isValid, dataProcessingConsent]);

  // Set initial values when data prop changes
  useEffect(() => {
    Object.keys(data).forEach((key) => {
      setValue(key as keyof MotivationNotes, data[key as keyof MotivationNotes]);
    });
  }, [data, setValue]);

  const handleFinalSubmit = () => {
    if (isValid && dataProcessingConsent) {
      // Force immediate update before final submission
      forceUpdate(watchedValues);
      
      const newsletterData = {
        subscribeNewsletter: newsletterConsent,
        dataProcessingConsent: dataProcessingConsent
      };
      onSubmit(newsletterData);
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Step Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-display font-bold text-madiro-primary mb-2">
          Motivation & Additional Notes
        </h2>
        <p className="text-gray-600">
          Help us understand your motivation for joining our roster and highlight your key achievements. 
          This is your chance to tell us what makes you a great fit for humanitarian digital health work.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(handleFinalSubmit)} className="space-y-6">
        {/* Motivation */}
        <FormField
          label="Why are you interested in joining a roster focused on NGOs, humanitarian health organizations, and open-source digital health?"
          required
          error={errors.motivation?.message}
          hint="Tell us about your passion for humanitarian work, global health, or digital health for good (minimum 50 characters)"
        >
          <textarea
            {...register('motivation')}
            className="form-textarea"
            placeholder="I'm passionate about using technology to improve healthcare outcomes in underserved communities. I believe that..."
            rows={4}
          />
        </FormField>

        {/* Key Achievements */}
        <FormField
          label="Key achievements in digital health you are most proud of"
          required
          error={errors.keyAchievements?.message}
          hint="Share specific accomplishments, projects, or impacts you've made in digital health or related fields (minimum 50 characters)"
        >
          <textarea
            {...register('keyAchievements')}
            className="form-textarea"
            placeholder="Led the implementation of a patient management system that served over 10,000 patients in rural Kenya..."
            rows={4}
          />
        </FormField>

        {/* Additional Notes */}
        <FormField
          label="Any additional notes you wish to share"
          error={errors.additionalNotes?.message}
          hint="Optional: Share anything else you'd like us to know about your background, interests, or availability"
        >
          <textarea
            {...register('additionalNotes')}
            className="form-textarea"
            placeholder="I'm particularly interested in mental health applications and have experience with..."
            rows={3}
          />
        </FormField>

        {/* Newsletter and Consent Section */}
        <div className="border-t pt-8 mt-8">
          <h3 className="text-lg font-display font-semibold text-madiro-primary mb-4">
            Newsletter & Data Processing
          </h3>
          
          {/* Newsletter Opt-in */}
          <div className="mb-6">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={newsletterConsent}
                onChange={(e) => setNewsletterConsent(e.target.checked)}
                className="form-checkbox mt-1"
              />
              <div className="text-sm text-gray-700 leading-relaxed">
                <p className="font-medium mb-1">Newsletter Subscription (Optional)</p>
                <p>If you consent to us sending you our newsletter and other periodic communications, please tick below. 
                   You can unsubscribe from these communications at any time.</p>
                <p className="mt-2 font-medium">I agree to receive other communications from Madiro.</p>
              </div>
            </label>
          </div>

          {/* Data Processing Consent - Required */}
          <div className="mb-6">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={dataProcessingConsent}
                onChange={(e) => setDataProcessingConsent(e.target.checked)}
                className="form-checkbox mt-1"
                required
              />
              <div className="text-sm text-gray-700 leading-relaxed">
                <p className="font-medium mb-1">Data Processing Consent (Required) *</p>
                <p>By clicking submit below, you consent to allow Madiro to store and process the personal 
                   information submitted above to provide you the content requested.</p>
              </div>
            </label>
          </div>

          {/* Data Processing Notice */}
          <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
            <h4 className="font-medium text-gray-700 mb-2">How we use your data:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>To match you with relevant project opportunities</li>
              <li>To contact you about suitable consulting engagements</li>
              <li>To maintain our talent roster database</li>
              <li>To send periodic updates about our work (if you opt-in)</li>
            </ul>
            <p className="mt-3 text-xs">
              We never share your personal information with third parties without your explicit consent. 
              You can request deletion of your data at any time by contacting us.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <StepNavigation
          onBack={onBack}
          onNext={handleFinalSubmit}
          isFirst={isFirst}
          isLast={isLast}
          canProceed={canProceed}
          isSubmitting={isLoading}
        />
      </form>
    </div>
  );
};

export default Step8Motivation;