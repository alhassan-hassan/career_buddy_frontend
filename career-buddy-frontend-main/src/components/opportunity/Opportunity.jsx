import opportunityStyles from "./opportunity.module.scss";

const Opportunity = ({ name, onClick }) => {
  return (
    <div className={opportunityStyles.wrapper} onClick={onClick}>
      an {name}
    </div>
  );
};

export default Opportunity;
