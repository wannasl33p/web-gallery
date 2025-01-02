import styles from "./AddArtWork.module.scss";

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

export function AddArtWork() {
  const isAuth = useSelector(selectIsAuth);
  const [imageURL, setImageURL] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const inputFile = useRef(null);
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      authorName: "",
      year: "",
      description: "",
      artStyle: null,
      artSubject: null,
      L: "",
      B: "",
      H: "",
      cost: "",
    },
  });

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      setImageURL(data.url);
    } catch (error) {
      console.warn(error);
      alert("Ошибка при загрузке!");
    }
  };

  const handleRemoveImage = () => {
    setImageURL(null);
  };

  const onSubmit = async (formData) => {
    try {
      if (!imageURL) {
        return alert("Загрузите фотографию!");
      }

      setIsLoading(true);
      formData.imagesURL = [`http://localhost:4000${imageURL}`];
      await axios.post("/profile/add", formData);
      nav("/profile");
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
      <h1>Заполните форму для добавления вашей картины в каталог</h1>
      <div className={styles.fileLoad}>
        <button
          className={styles.btn}
          onClick={() => inputFile.current.click()}
        >
          Загрузить фотографию
        </button>
        <input type="file" hidden ref={inputFile} onChange={handleChangeFile} />
        {imageURL && (
          <>
            <button className={styles.btn} onClick={handleRemoveImage}>
              Удалить
            </button>
            <img src={`http://localhost:4000${imageURL}`} alt="Uploaded" />
          </>
        )}
      </div>
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
