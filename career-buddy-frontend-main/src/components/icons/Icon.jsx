import IconStyles from "./icon.module.scss";

const Icon = ({ label, customSVG = null, style, name }) => {
  return label ? (
    <div className={IconStyles.wrapper} style={{ ...style }} label={label}>
      {customSVG}
      <small>{name}</small>
    </div>
  ) : (
    <div className={IconStyles.wrapperNoLabel} style={{ ...style }}>
      {customSVG}
      <small>{name}</small>
    </div>
  );
};

export default Icon;
