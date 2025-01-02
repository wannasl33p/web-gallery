import styles from "./Contacts.module.scss";

export function Contacts() {
  return (
    <div className={styles.layout}>
      <div className={styles.contacts}>
      </div>
      <div className={styles.underContacts}>
        <p>Телефон: +228</p>
        <p>Почта: @gmail.com</p>
        <p>Время работы 11.00-12.00</p>
      </div>
    </div>
  );
}
