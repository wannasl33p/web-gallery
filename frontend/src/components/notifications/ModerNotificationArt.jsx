import styles from "./Notifications.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "../../redux/axios";

export function ModerNotificationArt({
  _id,
  title,
  authorName,
  year,
  descriprion,
  sizes,
  artStyle,
  artSubject,
  url,
  owner,
  cost,
}) {
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = () => {
    setIsLoading(true);
    axios
      .patch("/moderation", { artId: _id })
      .then((res) => {
        setIsLoading(false);
        setMsg(res.data.message);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка!");
      });
  };

  const handleDeny = () => {
    setIsLoading(true);
    axios
      .delete("/moderation", { data: { artId: _id } })
      .then((res) => {
        setIsLoading(false);
        setMsg(res.data.message);
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
            <div>
              <Link to={"/art/" + _id}>
                <img src={url} width={"200px"} />
              </Link>
            </div>
            <div>
              <p>
                Название:<span>{title}</span>
              </p>
              <p>
                Автор:<span>{authorName}</span>
              </p>
              <p>
                Год:<span>{year}</span>
              </p>
              <p>
                Размеры:<span>{sizes}</span>
              </p>
              <p>
                Описание:<span>{descriprion ? descriprion : "-"}</span>
              </p>
              <p>
                Стиль:<span>{artStyle}</span>
              </p>
              <p>
                Сюжет:<span>{artSubject}</span>
              </p>
              <p>
                ID владельца:<span>{owner}</span>
              </p>
              <p>
                Цена:<span>{cost}byn</span>
              </p>
            </div>

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
            <br></br>
          </div>
        </>
      )}
      {msg && <p>{msg}</p>}
    </>
  );
}
