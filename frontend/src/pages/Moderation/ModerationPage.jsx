import styles from "./ModerationPage.module.scss";
import { useSelector, useDispatch } from "react-redux";

import { fetchModerationInfo } from "../../redux/slices/moderation";
import { useEffect } from "react";

import { ModerNotificationArt } from "../../components/notifications/ModerNotificationArt";
import { ModerNotificationOrder } from "../../components/notifications/ModerNotificationOrder";

export function ModerationPage() {
  const dispatch = useDispatch();

  const { moderation } = useSelector((state) => state.moderation);

  useEffect(() => {
    dispatch(fetchModerationInfo());
  }, []);
  console.log(moderation.items[1]);
  return (
    <>
      {moderation.status === "loaded" && (
        <div className={styles.layout}>
          <div className={styles.arts}>
            <h2>Картины</h2>
            {moderation.items[0].map((art) => {
              return (
                <ModerNotificationArt
                  key={art._id}
                  _id={art._id}
                  title={art.title}
                  authorName={art.authorName}
                  descriprion={art.descriprion}
                  url={art.imagesURL[0]}
                  cost={art.cost}
                  owner={art.owner}
                  sizes={`${art.L}x${art.B}x${art.H ? art.H : ""}см`}
                  year={art.year}
                  artStyle={art.artStyle}
                  artSubject={art.artSubject}
                />
              );
            })}
          </div>
          <div className={styles.orders}>
            <h2>Заказы</h2>
            {moderation.items[1].map((order) => {
              return (
                <ModerNotificationOrder
                  key={order._id}
                  address={order.address}
                  artId={order.artId}
                  cost={order.cost}
                  customerName={order.customerName}
                  orderDate={order.orderDate}
                  email={order.email}
                  owner={order.owner}
                  phoneNumber={order.phoneNumber}
                  _id={order._id}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
