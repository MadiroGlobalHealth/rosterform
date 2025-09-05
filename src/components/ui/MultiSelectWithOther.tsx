import React from 'react';
import MultiSelect from './MultiSelect';
import FormField from './FormField';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectWithOtherProps {
  options: Option[] | string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
  maxSelections?: number;
  showOrder?: boolean;
  className?: string;
  error?: string;
  otherError?: string;
  otherPlaceholder?: string;
  label?: string;
  required?: boolean;
  hint?: string;
}

const MultiSelectWithOther: React.FC<MultiSelectWithOtherProps> = ({
  options,
  selected,
  onChange,
  otherValue = '',
  onOtherChange,
  maxSelections,
  showOrder = false,
  className = '',
  error,
  otherError,
  otherPlaceholder = 'Please specify...',
  label,
  required = false,
  hint
}) => {
  const hasOtherSelected = selected.includes('Other');

  return (
    <div>
      <FormField
        label={label || ''}
        required={required}
        error={error}
        hint={hint}
      >
        <MultiSelect
          options={options}
          selected={selected}
          onChange={onChange}
          maxSelections={maxSelections}
          showOrder={showOrder}
          className={className}
        />
      </FormField>
      
      {hasOtherSelected && onOtherChange && (
        <div className="mt-4">
          <FormField
            label="Please specify"
            required={hasOtherSelected}
            error={otherError}
          >
            <input
              type="text"
              value={otherValue}
              onChange={(e) => onOtherChange(e.target.value)}
              className="form-input"
              placeholder={otherPlaceholder}
            />
          </FormField>
        </div>
      )}
    </div>
  );
};

export default MultiSelectWithOther;