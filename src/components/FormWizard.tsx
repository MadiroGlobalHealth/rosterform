import React from 'react';
import { useFormData } from '@/hooks/useFormData';
import ProgressBar from '@/components/ui/ProgressBar';
import Step1Personal from '@/components/steps/Step1Personal';
import Step2Education from '@/components/steps/Step2Education';
import Step3NGO from '@/components/steps/Step3NGO';
import Step4Professional from '@/components/steps/Step4Professional';
import Step5OpenSource from '@/components/steps/Step5OpenSource';
import Step6Availability from '@/components/steps/Step6Availability';
import Step7Contracting from '@/components/steps/Step7Contracting';
import Step8Motivation from '@/components/steps/Step8Motivation';
import ConfirmationPage from '@/components/ConfirmationPage';

const FormWizard: React.FC = () => {
  const {
    formData,
    currentStep,
    isLoading,
    setIsLoading,
    updateStepData,
    updateNewsletterData,
    nextStep,
    prevStep,
    resetForm
  } = useFormData();

  const stepLabels = [
    'Personal',
    'Education',
    'NGO Exp',
    'Profile',
    'Open Source',
    'Availability',
    'Contracting',
    'Motivation'
  ];

  const totalSteps = 8;

  const handleStepComplete = () => {
    nextStep();
  };

  const handleSubmit = async (newsletterData: any) => {
    setIsLoading(true);
    try {
      // Update newsletter data
      updateNewsletterData(newsletterData);
      
      // Prepare complete form data for submission
      const completeData = {
        ...formData,
        newsletter: newsletterData
      };

      // Import Netlify Forms utility
      const { submitToNetlifyForm, validateFormDataForSubmission, sanitizeFormData } = await import('@/utils/netlifyForms');
      
      // Validate form data
      const validationErrors = validateFormDataForSubmission(completeData);
      if (validationErrors.length > 0) {
        throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
      }

      // Sanitize form data
      const sanitizedData = sanitizeFormData(completeData);
      
      // Submit to Netlify Forms
      const result = await submitToNetlifyForm(sanitizedData);
      
      if (result.success) {
        console.log('Form submitted successfully');
        // Move to confirmation step
        nextStep();
      } else {
        throw new Error(result.error || 'Form submission failed');
      }
      
    } catch (error) {
      console.error('Form submission failed:', error);
      
      // Show user-friendly error message
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'An unexpected error occurred. Please try again.';
      
      alert(`Submission failed: ${errorMessage}`);
      
      // Could implement a toast notification system instead of alert
      
    } finally {
      setIsLoading(false);
    }
  };

  const renderCurrentStep = () => {
    const stepProps = {
      onNext: handleStepComplete,
      onBack: prevStep,
      isFirst: currentStep === 1,
      isLast: currentStep === totalSteps
    };

    switch (currentStep) {
      case 1:
        return (
          <Step1Personal
            data={formData.personal}
            onUpdate={(data) => updateStepData('personal', data)}
            {...stepProps}
          />
        );
      case 2:
        return (
          <Step2Education
            data={formData.education}
            onUpdate={(data) => updateStepData('education', data)}
            {...stepProps}
          />
        );
      case 3:
        return (
          <Step3NGO
            data={formData.ngo}
            onUpdate={(data) => updateStepData('ngo', data)}
            {...stepProps}
          />
        );
      case 4:
        return (
          <Step4Professional
            data={formData.professional}
            onUpdate={(data) => updateStepData('professional', data)}
            {...stepProps}
          />
        );
      case 5:
        return (
          <Step5OpenSource
            data={formData.openSource}
            onUpdate={(data) => updateStepData('openSource', data)}
            {...stepProps}
          />
        );
      case 6:
        return (
          <Step6Availability
            data={formData.availability}
            onUpdate={(data) => updateStepData('availability', data)}
            {...stepProps}
          />
        );
      case 7:
        return (
          <Step7Contracting
            data={formData.contracting}
            onUpdate={(data) => updateStepData('contracting', data)}
            {...stepProps}
          />
        );
      case 8:
        return (
          <Step8Motivation
            data={formData.motivation}
            onUpdate={(data) => updateStepData('motivation', data)}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            {...stepProps}
          />
        );
      case 9:
        return (
          <ConfirmationPage 
            onReset={resetForm}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar - hide on confirmation page */}
      {currentStep <= totalSteps && (
        <ProgressBar
          currentStep={currentStep}
          totalSteps={totalSteps}
          stepLabels={stepLabels}
        />
      )}

      {/* Step Content */}
      <div className="step-card">
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default FormWizard;