import React from 'react';

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  required = false,
  error,
  hint,
  children,
  className = ''
}) => {
  return (
    <div className={`form-field ${className}`}>
      <label className={`form-label ${required ? 'required' : ''}`}>
        {label}
      </label>
      {children}
      {hint && !error && (
        <span className="form-hint">{hint}</span>
      )}
      {error && (
        <span className="form-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default FormField;