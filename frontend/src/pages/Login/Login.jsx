import styles from "./Login.module.scss";

import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, selectIsAuth } from "../../redux/slices/auth";

import { useForm } from "react-hook-form";

export function Login() {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const [successAuth, setSuccessAuth] = useState(true);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchUserData(values));
    if (data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    } else {
      setSuccessAuth(false);
    }
  };

  if (isAuth) {
    return <Navigate to={"/catalog"}></Navigate>;
  }

  return (
    <div className={styles.layout}>
      <fieldset className={styles.forFieldset}>
        <legend>Вход</legend>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formStyle}>
          <div className={styles.itemStyle}>
            <label htmlFor="email">Введите Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              {...register("email", { required: "Укажите почту" })}
            />
            {errors ? (
              <span className={styles.error}>{errors.email?.message}</span>
            ) : (
              ""
            )}
          </div>
          <br />
          <div className={styles.itemStyle}>
            <label htmlFor="password">Введите пароль</label>

            <input
              type="password"
              name="password"
              id="password"
              placeholder="Пароль"
              {...register("password", { required: "Укажите пароль" })}
            />
            {errors ? (
              <span className={styles.error}>{errors.password?.message}</span>
            ) : (
              ""
            )}
          </div>
          <br />
          <Link className={styles.msg} to={"/register"}>
            Нет аккаунта?. Зарегистрироваться.
          </Link>
          <button type="submit" className={styles.btn}>
            Войти
          </button>
          {!successAuth ? (
            <span className={styles.error}>Не удалось авторизоваться</span>
          ) : (
            ""
          )}
        </form>
      </fieldset>
    </div>
  );
}
