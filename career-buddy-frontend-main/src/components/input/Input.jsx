import InputStyles from "./input.module.css";

const Input = ({ type, label, placeholder, onChange, id, defaultValue }) => {
  return (
    <div className={InputStyles.wrapper}>
      <input
        type={type}
        className={InputStyles.input}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        label={label}
        defaultValue={defaultValue}
      />
      <label htmlFor={id} className={InputStyles.label}>
        <small className={InputStyles.small}>{label}</small>
      </label>
    </div>
  );
};

export default Input;
