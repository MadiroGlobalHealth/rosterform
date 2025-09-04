import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[] | string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  maxSelections?: number;
  className?: string;
  error?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selected,
  onChange,
  maxSelections,
  className = '',
  error
}) => {
  const normalizedOptions: Option[] = options.map(opt => 
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

  const handleToggle = (value: string) => {
    if (selected.includes(value)) {
      // Remove from selection
      onChange(selected.filter(item => item !== value));
    } else {
      // Add to selection (if under max limit)
      if (!maxSelections || selected.length < maxSelections) {
        onChange([...selected, value]);
      }
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {maxSelections && (
        <div className="text-sm text-gray-600 mb-3">
          Select up to {maxSelections} options ({selected.length}/{maxSelections} selected)
        </div>
      )}
      
      <div className="grid gap-3">
        {normalizedOptions.map((option) => {
          const isSelected = selected.includes(option.value);
          const isDisabled = Boolean(maxSelections && selected.length >= maxSelections && !isSelected);
          
          return (
            <label 
              key={option.value}
              className={`
                flex items-start space-x-3 p-3 border rounded-lg cursor-pointer
                transition-all duration-200
                ${isSelected 
                  ? 'bg-madiro-primary/5 border-madiro-primary' 
                  : 'bg-white border-gray-300 hover:border-gray-400'
                }
                ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => !isDisabled && handleToggle(option.value)}
                className="form-checkbox mt-0.5"
                disabled={isDisabled}
              />
              <span className={`text-sm leading-relaxed ${isSelected ? 'text-madiro-primary font-medium' : 'text-gray-700'}`}>
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
      
      {error && (
        <span className="form-error block mt-2" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default MultiSelect;