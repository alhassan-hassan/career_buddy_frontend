const FullMessage = ({ notificationData }) => {
  return (
    <div>
      <h1 style={{ marginBottom: "0.8rem" }}>{notificationData["subject"]}</h1>
      <hr />
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "0.7rem",
        }}
      >
        <h3>{notificationData["from"]}</h3>
        <small>{notificationData["date"]}</small>
      </div>
      {notificationData["content"]}
    </div>
  );
};

export default FullMessage;
