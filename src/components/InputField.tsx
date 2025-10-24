import React from "react";

interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  onBlur?: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  error,
  onBlur,
}) => {
  return (
    <div style={{ marginBottom: 12 }}>
      <input
        type="text"
        className={`amount-input ${error ? "invalid" : ""}`}
        placeholder="Enter amount"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-label="amount"
        aria-invalid={!!error}
      />
      {error ? (
        <div className="amount-error" role="alert">
          {error}
        </div>
      ) : null}
    </div>
  );
};

export default InputField;