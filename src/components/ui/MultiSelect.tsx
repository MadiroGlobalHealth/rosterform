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
  showOrder?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selected,
  onChange,
  maxSelections,
  className = '',
  error,
  showOrder = false
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
          {showOrder 
            ? `Select up to ${maxSelections} options in order of importance (${selected.length}/${maxSelections} selected)` 
            : `Select up to ${maxSelections} options (${selected.length}/${maxSelections} selected)`
          }
        </div>
      )}

      {/* Show selected items in order (for showOrder mode) */}
      {showOrder && selected.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Your ranking:</h4>
          <div className="space-y-2">
            {selected.map((item, index) => (
              <div key={item} className="flex items-center justify-between bg-white rounded px-3 py-2 border">
                <span className="text-sm">
                  <span className="font-medium text-madiro-primary">#{index + 1}</span> {item}
                </span>
                <button
                  type="button"
                  onClick={() => onChange(selected.filter(s => s !== item))}
                  className="text-gray-400 hover:text-red-500"
                  title="Remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid gap-3">
        {normalizedOptions.map((option) => {
          const isSelected = selected.includes(option.value);
          const isDisabled = Boolean(maxSelections && selected.length >= maxSelections && !isSelected);
          const order = isSelected ? selected.indexOf(option.value) + 1 : 0;
          
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
              <span className={`text-sm leading-relaxed flex-1 ${isSelected ? 'text-madiro-primary font-medium' : 'text-gray-700'}`}>
                {option.label}
              </span>
              {showOrder && isSelected && (
                <span className="text-xs bg-madiro-primary text-white rounded-full w-6 h-6 flex items-center justify-center font-medium">
                  {order}
                </span>
              )}
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