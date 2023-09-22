const BoldOneLineData = ({ left, right, style }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        fontWeight: "bold",
        ...style,
      }}
    >
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
};

export default BoldOneLineData;
