import styles from "./Catalog.module.scss";
import { PreArtWork } from "../../components/PreArtWork/PreArtWork";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCatalog } from "../../redux/slices/arts";

export function Catalog() {
  const dispatch = useDispatch();
  const { arts } = useSelector((state) => state.arts);

  const isLoading = arts.status === "loading";

  useEffect(() => {
    dispatch(fetchCatalog());
  }, []);

  return (
    <div className={styles.layout}>
      {(isLoading ? [...Array(7)] : arts.items).map((obj, index) =>
        isLoading ? (
          <PreArtWork key={index} isLoading={true} />
        ) : (
          <PreArtWork
            key={obj._id}
            _id={obj._id}
            title={obj.title}
            authorName={obj.authorName}
            year={obj.year}
            sizes={`${obj.L}x${obj.B}${obj.H ? "x" + obj.H : ""}см`}
            url={obj.imagesURL}
            catalogStatus={obj.catalogStatus}
            cost={obj.cost}
            isLoading={false}
          />
        ),
      )}
    </div>
  );
}
