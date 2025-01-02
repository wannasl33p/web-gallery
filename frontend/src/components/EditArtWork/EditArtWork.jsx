import styles from "../../pages/AddArtWork/AddArtWork.module.scss";

import { useForm, Controller } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

import axios from "../../redux/axios";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";

import { Select } from "antd";

const styleList = [
  "Авангард",
  "Абстракционизм",
  "Барокко",
  "Брутализм",
  "Импрессионизм",
  "Готика",
  "Дадаизм",
  "Декоративное искусство",
  "Живопись",
  "Зародыш",
  "Искусство модернизма",
  "Классицизм",
  "Концептуализм",
  "Кубизм",
  "Минимализм",
  "Наивное искусство",
  "Постмодернизм",
  "Поп-арт",
  "Реализм",
  "Романтизм",
  "Сюрреализм",
  "Фовизм",
  "Экспрессионизм",
];

const subjectList = [
  "Автопортрет",
  "Батальная сцена",
  "Групповой портрет",
  "Космос",
  "Натюрморт",
  "Пейзаж",
  "Портрет",
  "Сцена из жизни",
  "Сюжет из мифологии",
  "Тема любви",
  "Тема смерти",
  "Фантастический сюжет",
];

export function EditArtWork(artData) {
  const isAuth = useSelector(selectIsAuth);
  const data = artData.artData;
  const [isLoading, setIsLoading] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: data.title,
      authorName: data.authorName,
      year: data.year,
      description: data?.description,
      artStyle: data.artStyle,
      artSubject: data.artSubject,
      L: data.L,
      B: data.B,
      H: data?.H,
      cost: data.cost,
    },
  });

  const onSubmit = async (formData) => {
    try {
      setIsLoading(true);
      formData.imagesURL = artData.artData.imagesURL[0];
      await axios.patch("/art/" + artData.artData._id, formData);
      document.location.reload();
    } catch (error) {
      console.warn(error);
      alert("Произошла ошибка отправки формы");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuth) {
    return <Navigate to={"/catalog"} />;
  }

  return (
    <div className={styles.layout}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formStyle}>
        <div className={styles.itemStyle}>
          <input
            type="text"
            {...register("title", { required: "Название обязательно" })}
            placeholder="Название картины"
            className={styles.title}
          />
          {errors.title && (
            <p className={styles.error}>{errors.title.message}</p>
          )}
        </div>
        <div className={styles.itemStyle}>
          <input
            type="text"
            {...register("authorName", { required: "Автор обязателен" })}
            placeholder="Автор"
            className={styles.author}
          />
          {errors.authorName && (
            <p className={styles.error}>{errors.authorName.message}</p>
          )}
        </div>
        <div className={styles.itemStyle}>
          <input
            type="number"
            {...register("year", { required: "Укажите корректный год" })}
            placeholder="Год написания"
            className={styles.author}
          />
          {errors.year && <p className={styles.error}>{errors.year.message}</p>}
        </div>
        <div className={styles.itemStyle}>
          <textarea
            {...register("description")}
            placeholder="Описание"
            className={styles.description}
          />
        </div>
        <div className={styles.itemStyle}>
          <p>Выберите стиль искусства</p>
          <Controller
            name="artStyle"
            control={control}
            rules={{ required: "Выберите стиль искусства" }}
            render={({ field }) => (
              <Select
                className={styles.selectStyle}
                {...field}
                options={styleList.map((item) => ({
                  value: item,
                  label: item,
                }))}
              />
            )}
          />
          {errors.artStyle && (
            <p className={styles.error}>{errors.artStyle.message}</p>
          )}
        </div>
        <div className={styles.itemStyle}>
          <p>Выберите сюжет</p>
          <Controller
            name="artSubject"
            control={control}
            rules={{ required: "Выберите сюжет" }}
            render={({ field }) => (
              <Select
                className={styles.selectStyle}
                {...field}
                options={subjectList.map((item) => ({
                  value: item,
                  label: item,
                }))}
              />
            )}
          />
          {errors.artSubject && (
            <p className={styles.error}>{errors.artSubject.message}</p>
          )}
        </div>
        <div className={styles.itemStyle}>
          <input
            type="number"
            {...register("L", { required: "Укажите корректную длину" })}
            placeholder="Длина (см)"
            min={1}
            className={styles.sizes}
          />
          {errors.L && <p className={styles.error}>{errors.L.message}</p>}

          <input
            type="number"
            {...register("B", { required: "Укажите корректную ширину" })}
            placeholder="Ширина (см)"
            min={1}
            className={styles.sizes}
          />
          {errors.B && <p className={styles.error}>{errors.B.message}</p>}

          <input
            type="number"
            {...register("H")}
            placeholder="Толщина (см)"
            className={styles.sizes}
          />
        </div>
        <div className={styles.itemStyle}>
          <input
            type="number"
            {...register("cost", { required: "Укажите корректную цену" })}
            placeholder="Цена (BYN)"
            min={1}
            className={styles.sizes}
          />
          {errors.cost && <p className={styles.error}>{errors.cost.message}</p>}
        </div>
        <button type="submit" className={styles.btn}>
          Отправить
        </button>
      </form>
    </div>
  );
}
