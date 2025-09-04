import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  currentStep, 
  totalSteps, 
  stepLabels 
}) => {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full mb-8">
      {/* Progress Bar */}
      <div className="relative">
        <div className="flex mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-madiro-primary h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
        
        {/* Step Indicators */}
        <div className="flex justify-between items-center">
          {stepLabels.map((label, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;
            
            return (
              <div key={index} className="flex flex-col items-center">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  transition-all duration-200
                  ${isActive 
                    ? 'bg-madiro-primary text-white ring-4 ring-madiro-primary/20' 
                    : isCompleted 
                      ? 'bg-madiro-accent text-madiro-primary' 
                      : 'bg-gray-300 text-gray-600'
                  }
                `}>
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    stepNumber
                  )}
                </div>
                <span className={`
                  mt-2 text-xs font-medium text-center max-w-20
                  ${isActive ? 'text-madiro-primary' : 'text-gray-500'}
                `}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Current Step Info */}
      <div className="text-center mt-6">
        <span className="text-sm text-gray-600">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;