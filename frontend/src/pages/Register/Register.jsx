import styles from "./Register.module.scss";

import { Link, Navigate, useNavigate } from "react-router-dom";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { fetchUserRegister, selectIsAuth } from "../../redux/slices/auth";

export function Register() {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const [successReg, setSuccessReg] = useState(true);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchUserRegister(values));
    if (data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    } else {
      setSuccessReg(false);
    }
  };
  if (isAuth) {
    return <Navigate to={"/catalog"}></Navigate>;
  }

  return (
    <div className={styles.layout}>
      <fieldset className={styles.forFieldset}>
        <legend>Регистрация</legend>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formStyle}>
          <div className={styles.itemStyle}>
            <label htmlFor="email">Введите Email</label>

            <input
              type="email"
              name="email"
              id="email"
              {...register("email", { required: "Укажите почту" })}
              placeholder="E-mail"
            />
            {errors ? (
              <span className={styles.error}>{errors.email?.message}</span>
            ) : (
              ""
            )}
          </div>
          <br />

          <div className={styles.itemStyle}>
            <label htmlFor="username">Введите имя пользователя</label>

            <input
              type="text"
              name="fullName"
              id="fullName"
              {...register("fullName", { required: "Укажите свое имя" })}
              placeholder="Имя"
            />
            {errors ? (
              <span className={styles.error}>{errors.fullName?.message}</span>
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
              {...register("password", { required: "Укажите пароль" })}
              placeholder="Пароль"
            />
            {errors ? (
              <span className={styles.error}>{errors.password?.message}</span>
            ) : (
              ""
            )}
          </div>
          <br />
          <Link className={styles.msg} to={"/login"}>
            Есть аккаунт?. Войти.
          </Link>
          <button type="submit" className={styles.btn}>
            Зарегистрироваться
          </button>
          {!successReg ? (
            <span className={styles.error}>Не удалось зарегистрироваться</span>
          ) : (
            ""
          )}
        </form>
      </fieldset>
    </div>
  );
}
