import styles from "./Info.module.scss";
import { Link, useNavigate } from "react-router-dom";

export function Info() {
  const navigate = useNavigate();
  return (
    <div className={styles.layout}>

      <div className={styles.info}>
        <div className={styles.hello}>
          <p>
            На нашем сайте вы можете легко купить или продать картины,
            независимо от вашего уровня опыта или знаний в искусстве. Мы создали
            платформу, где художники, коллекционеры и любители искусства могут
            встретиться и обменяться уникальными произведениями.
          </p>
        </div>
        
        <div className={styles.market}>
          <h3 className={styles.marketInfo}>Как это работает?</h3>
          <ol>
            <li>
              <Link to={"/register"}>Создайте аккаунт</Link> и заполните
              профиль.
            </li>
            <li>
              Исследуйте <Link to={"/catalog"}>нашу галерею</Link> и находите
              картины, которые вам нравятся.
            </li>
            <li>
              Если вы нашли то, что искали, оформите заказ или разместите свою
              картину на продажу.
            </li>
          </ol>
        </div>
      </div>
      <div
        className={styles.navigate}
        onClick={() => {
          navigate("/catalog");
        }}
      >
        Каталог
      </div>
    </div>
  );
}
