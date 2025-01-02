import logo from "/logo-grayscale-inverted.png";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

import { useState } from "react";
import { useSelector } from "react-redux";

import { selectIsAuth } from "../../redux/slices/auth";

export function Header() {
  const isAuth = useSelector(selectIsAuth);

  return (
    <div className={styles.layout}>
      <Link to={"/"} className={styles.interactiveButton}>
        Информация
      </Link>
      <Link to={"/catalog"}>
        <div className={styles.logo}>
          <img src={logo} alt="" width={"25px"} height={"25px"} />
          <h1>Галерея</h1>
        </div>
      </Link>
      {isAuth ? (
        <Link to={"/profile"} className={styles.interactiveButton}>
          Профиль
        </Link>
      ) : (
        <Link to={"/login"} className={styles.interactiveButton}>
          Войти
        </Link>
      )}
    </div>
  );
}
