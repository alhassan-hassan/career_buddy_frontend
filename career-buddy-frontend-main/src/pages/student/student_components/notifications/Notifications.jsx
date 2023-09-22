import NotificationCard from "./NotificationCard";
import FullMessage from "./FullMessage";

import NotificationsStyles from "./notifications.module.scss";

import Skeleton from "@components/skeleton/Skeleton";

import { useState, useEffect } from "react";
import useAuth from "@hooks/useAuth";
import { getNotifications } from "@network/api-handlers";

const Notifications = () => {
  const { auth } = useAuth();
  const [inbox, setInbox] = useState([]);
  const [notificationIndex, setNotificationIndex] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await getNotifications(auth.data[0].userID);
        console.log(response);
        setInbox(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className={NotificationsStyles.wrapper}>
      <div className={NotificationsStyles.notificationCards}>
        {inbox?.length ? (
          inbox.map((notif, index) => (
            <div
              onClick={() => setNotificationIndex(index)}
              style={{
                backgroundColor: `${
                  notificationIndex === index ? "#fafafa" : "initial"
                }`,
              }}
            >
              <NotificationCard {...notif} />
            </div>
          ))
        ) : (
          <>
            <Skeleton width="100%" />
            <br />
            <Skeleton width="100%" />
            <br />
            <Skeleton width="100%" />
            <br />
            <Skeleton width="100%" />
            <br />
            <Skeleton width="100%" />
          </>
        )}
      </div>
      <div className={NotificationsStyles.messageContent}>
        {notificationIndex == null ? (
          "click on a message to view"
        ) : (
          <FullMessage notificationData={inbox[notificationIndex]} />
        )}
      </div>
    </div>
  );
};

export default Notifications;
