import React from 'react';

interface StepNavigationProps {
  onBack?: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
  isSubmitting?: boolean;
  canProceed?: boolean;
}

const StepNavigation: React.FC<StepNavigationProps> = ({
  onBack,
  onNext,
  isFirst,
  isLast,
  isSubmitting = false,
  canProceed = true
}) => {
  return (
    <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-200">
      {/* Back Button */}
      <div>
        {!isFirst && onBack && (
          <button
            type="button"
            onClick={onBack}
            className="btn-secondary"
            disabled={isSubmitting}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        )}
      </div>

      {/* Next/Submit Button */}
      <div>
        <button
          type="button"
          onClick={onNext}
          disabled={!canProceed || isSubmitting}
          className={`btn-primary ${(!canProceed || isSubmitting) ? 'btn-disabled' : ''}`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : isLast ? (
            <>
              Submit Application
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </>
          ) : (
            <>
              Continue
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default StepNavigation;