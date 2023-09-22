const ResumeSection = ({ name }) => {
  return (
    <div>
      <div
        style={{
          fontWeight: "bold",
          borderBottom: "0.125rem solid black",
          marginBottom: "0.1rem",
        }}
      >
        {name.toUpperCase()}
      </div>
    </div>
  );
};

export default ResumeSection;
