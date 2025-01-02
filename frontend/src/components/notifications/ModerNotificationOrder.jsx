import styles from "./Notifications.module.scss";

import { useState } from "react";
import { Link } from "react-router-dom";

import axios from "../../redux/axios";

export function ModerNotificationOrder({
  _id,
  artId,
  customer,
  address,
  phoneNumber,
  owner,
  orderDate,
  customerName,
  cost,
  email,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const handleConfirm = () => {
    setIsLoading(true);
    axios
      .patch("/moderation", { orderId: _id })
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
      .delete("/moderation", { data: { orderId: _id } })
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
        <>
          <div className={styles.set}>
            <span className={styles.date}>{orderDate}</span>
            <p>
              ID заказа:<span>{_id}</span>
            </p>
            <p>
              ID картины:
              <span>
                <Link to={"/art/" + artId}>{artId}</Link>
              </span>
            </p>
            <p>
              Имя заказчика:
              <span>{customerName}</span>
            </p>
            <p>
              ID заказчика:
              <span>{customer ? customer : "-"}</span>
            </p>
            <p>
              Адресс:<span>{address}</span>
            </p>
            <p>
              E-mail<span>{email}</span>
            </p>
            <p>
              Номер телефона:<span>+375{phoneNumber}</span>
            </p>
            <p>
              ID владельца картины:<span>{owner}</span>
            </p>
            <p>
              цена:<span>{cost}</span>
            </p>
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
          </div>
        </>
      )}
    </>
  );
}
