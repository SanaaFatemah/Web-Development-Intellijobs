const FormRowSelect = ({ labelText, name, value, handleChange, list }) => {
  return (
    <div className="formInputRow">
      <label htmlFor={name} className="formInputLabel">
        {labelText || name}
      </label>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className="formInputSelect"
      >
        {list.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
