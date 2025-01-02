import styles from "./Profile.module.scss";
import { Skeleton } from "antd";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { PreArtWork } from "../../components/PreArtWork/PreArtWork";
import { UserNotification } from "../../components/notifications/UserNotification.jsx";
import { selectIsAuth, logout } from "../../redux/slices/auth";
import { fetchProfileInfo } from "../../redux/slices/profile.js";

export function Profile() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const { profile } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchProfileInfo());
  }, [dispatch]);

  const notificationsList = useRef(null);
  const [extendBtnStatus, setExtendBtnStatus] = useState(false);
  const extendNotifications = () => {
    setExtendBtnStatus(!extendBtnStatus);
  };
  useEffect(() => {
    if (notificationsList.current) {
      notificationsList.current.style.maxHeight = extendBtnStatus
        ? "fit-content"
        : "300px";
    }
  }, [extendBtnStatus]);

  const logOut = () => {
    if (window.confirm("Вы уверены что хотите выйти?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
      nav("/catalog");
    }
  };

  const nav = useNavigate();

  if (!window.localStorage.getItem("token")) {
    return <Navigate to={"/catalog"} />;
  }

  const user = profile?.items?.[0];
  const notifications = profile?.items?.[2] || [];

  const sortedNotifications = [...notifications].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });

  return (
    <>
      {profile.status !== "loaded" && (
        <>
          <Skeleton />
          <Skeleton />
        </>
      )}
      {profile.status === "loaded" && (
        <div className={styles.layout}>
          <button className={styles.logOutBtn} onClick={logOut}>
            Выйти из аккаунта
          </button>
          <div className={styles.data}>
            <div className={styles.userInfo}>
              <div className={styles.name}>Пользователь</div>
              <p>Имя: {user.fullName}</p>
              <p>Почта: {user.email}</p>
            </div>
            <div className={styles.notifications} ref={notificationsList}>
              <div className={styles.name}>Уведомления</div>
              {sortedNotifications.map((nts) => (
                <UserNotification
                  key={nts._id}
                  type={nts.type}
                  msg={nts.message}
                  date={nts.date}
                  orderId={nts.orderID}
                />
              ))}
              <button className={styles.btn} onClick={extendNotifications}>
                ...
              </button>
            </div>
          </div>
          <button
            className={styles.addBtn}
            onClick={() => {
              nav("/profile/add");
            }}
          >
            Добавить картину
          </button>
          <span className={styles.tab}>
            <h3>Картины в продаже</h3>
          </span>
          <div className={styles.artWorks}>
            {profile.items[1].map((art) => {
              return (
                <PreArtWork
                  key={art._id}
                  sizes={`${art.L}x${art.B}x${art.H ? art.H : ""}см`}
                  _id={art._id}
                  title={art.title}
                  authorName={art.authorName}
                  year={art.year}
                  url={art.imagesURL[0]}
                  catalogStatus={art.catalogStatus}
                  isLoading={false}
                  cost={art.cost}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
