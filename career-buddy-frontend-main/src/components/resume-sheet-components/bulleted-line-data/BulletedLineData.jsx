const BulletedLineData = ({ data, key }) => {
  return (
    <div style={{ display: "flex" }} key={key}>
      <span style={{ marginRight: "0.2rem" }}>•</span>
      <div>{data}</div>
    </div>
  );
};

export default BulletedLineData;
