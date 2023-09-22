const OneLineData = ({ left, right, style }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", ...style }}>
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
};

export default OneLineData;
