import styles from "./Notifications.module.scss";

import axios from "../../redux/axios";
import { useState } from "react";

export function UserNotification({ type, msg, date, orderId }) {
  const [isLoading, setIsLoading] = useState(false);
  const handleConfirm = () => {
    setIsLoading(true);
    axios
      .patch("/profile", { orderId: orderId })
      .then((res) => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка!");
      });
  };

  const handleDeny = () => {
    setIsLoading(true);
    axios
      .patch("/profile/cancel", { orderId: orderId })
      .then((res) => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка!");
      });
  };
  return (
    <>
      {!isLoading && (
        <div className={styles.layout}>
          <span className={styles.date}>{date}</span>
          <span className={styles.msg}>{msg}</span>
          {type === "dynamic" ? (
            <div className={styles.forBtns}>
              <button
                type="submit"
                className={styles.confirmBtn}
                onClick={handleConfirm}
              >
                Подтвердить
              </button>
              <button
                type="submit"
                className={styles.denyBtn}
                onClick={handleDeny}
              >
                Отменить
              </button>
            </div>
          ) : (
            ""
          )}
          <br></br>
        </div>
      )}
    </>
  );
}
