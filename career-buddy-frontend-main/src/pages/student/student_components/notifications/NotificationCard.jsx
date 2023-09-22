import NotificationCardStyles from "./notification-card.module.scss";

const NotificationCard = ({
  date,
  fNReviewer,
  lNReviewer,
  subject,
  content,
  isViewed,
}) => {
  return (
    <aside className={NotificationCardStyles.wrapper}>
      {!isViewed ? (
        <div className={NotificationCardStyles.isViewedDot}></div>
      ) : (
        <div className={NotificationCardStyles.isNotViewedDot}></div>
      )}
      <small className={NotificationCardStyles.date}>{date}</small>
      <br />
      <br />
      <strong className={NotificationCardStyles.from}>
        {fNReviewer + " " + lNReviewer}
      </strong>
      <br />
      <br />
      <article className={NotificationCardStyles.subject}>{subject}</article>
      <article className={NotificationCardStyles.content}>{content}</article>
    </aside>
  );
};

export default NotificationCard;
