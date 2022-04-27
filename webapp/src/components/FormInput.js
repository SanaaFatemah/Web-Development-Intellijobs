import React from "react";

const FormInput = ({
  type,
  name,
  value,
  handleChange,
  labelText,
  placeholder,
}) => {
  return (
    <div className="formInputRow">
      <label htmlFor={name} className="formInputLabel">
        {labelText || name}
      </label>

      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className="formInput"
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormInput;
