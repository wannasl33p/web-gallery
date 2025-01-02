import { useEffect, useRef } from "react";
import styles from "./PreArtWork.module.scss";
import { Image } from "antd";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "antd";

export function PreArtWork({
  _id,
  title,
  authorName,
  year,
  sizes,
  url,
  catalogStatus,
  cost,
  isLoading,
}) {
  const statusBar = useRef(null);
  useEffect(() => {
    if (catalogStatus !== "on" && statusBar.current !== null) {
      statusBar.current.style.display = "flex";
    }
  }, []);
  const setStatus = (catalogStatus) => {
    if (catalogStatus === "sold") {
      return "Продано";
    } else if (catalogStatus === "ordered") {
      return "Заказано";
    } else if (catalogStatus === "moderation") {
      return "На модерации";
    }
    return "";
  };
  const navigate = useNavigate();
  return (
    <>
      {isLoading ? (
        <div className={styles.layout}>
          <Skeleton.Node
            active
            style={{
              width: 200,
              height: 200,
            }}
          />
          <Skeleton active />
        </div>
      ) : (
        <div
          onClick={() => {
            navigate("/art/" + _id);
          }}
          className={styles.layout}
        >
          <div className={styles.imageBox}>
            <Image src={url} preview={false} width={"200px"}></Image>
            <div className={styles.statusBar} ref={statusBar}>
              <p>{setStatus(catalogStatus)}</p>
            </div>
          </div>
          <h4>{authorName}</h4>
          <h3>
            {title}, {year}
          </h3>
          <h2>{cost} byn</h2>
          <p>{sizes}</p>
        </div>
      )}
    </>
  );
}
