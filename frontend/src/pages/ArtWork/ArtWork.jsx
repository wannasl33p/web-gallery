import styles from "./ArtWork.module.scss";
import Order from "../../components/Order/Order";
import { Skeleton, notification } from "antd"; // Импортируем notification

import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "../../redux/axios";
import { EditArtWork } from "../../components/EditArtWork/EditArtWork";

export function ArtWork() {
  const userData = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/art/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при загрузке страницы!");
      });
  }, [id]);
  const handleEdit = () => {
    setIsEdit(!isEdit);
  };
  const handleDelete = () => {
    setIsLoading(true);
    axios
      .delete("/art/" + data._id)
      .then((res) => {
        setIsLoading(false);
        notification.success({
          message: res.data.message,
        });
        navigate("/catalog");
      })
      .catch((err) => {
        setIsLoading(false);
        console.warn(err);
        notification.error({
          message: "Ошибка",
          description: "Ошибка при удалении",
        });
      });
  };

  if (isLoading) {
    return (
      <div className={styles.layout}>
        <Skeleton.Node active style={{ width: 400, height: 200 }} />
        <Skeleton active style={{ width: 400 }} />
        <Skeleton active style={{ width: 400 }} />
      </div>
    );
  }

  return (
    <>
      <div className={styles.layout}>
        <div className={styles.data}>
          <img src={data.imagesURL[0]} width={"720px"} alt={data.title} />
        </div>
        <div className={styles.data}>
          {userData.data ? (
            userData.data._id === data.owner._id ? (
              <>
                <button className={styles.CBtn} onClick={handleEdit}>
                  Изменить
                </button>

                <button className={styles.DBtn} onClick={handleDelete}>
                  Удалить
                </button>
              </>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          <h3>
            {data.authorName}, {data.year}
          </h3>
          <h4>{data.title}</h4>
          <div className={styles.artInfo}>
            <p>
              Сюжет:<span>{data.artSubject}</span>
            </p>
            <p>
              Стиль:<span>{data.artStyle}</span>
            </p>
            <p>
              Размеры:
              <span>{`${data.L}x${data.B}${data.H ? "x" + data.H : ""}см`}</span>
            </p>
            <p>
              Продавец:<span>{<Link to="#">{data.owner.fullName}</Link>}</span>
            </p>
          </div>
          <h5>{data.description}</h5>
          {data.catalogStatus === "on" && (
            <div className={styles.order}>
              <div className={styles.toOrderBtn} onClick={showModal}>
                Оформить
              </div>
              <Order
                isModalOpen={isModalOpen}
                handleCancel={handleCancel}
                userData={userData}
                artData={data}
              />
              <h2>{data.cost} byn</h2>
            </div>
          )}
        </div>
      </div>
      {isEdit && <EditArtWork artData={data}/>}
    </>
  );
}
