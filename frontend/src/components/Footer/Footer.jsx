import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";

import { Contacts } from "../contacts/Contacts";

export function Footer() {
  const [showContacts, setShowContacts] = useState(false);
  const contactsRef = useRef(null);

  const handleSpanClick = () => {
    setShowContacts(!showContacts);
  };

  useEffect(() => {
    if (showContacts && contactsRef.current) {
      contactsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showContacts]);

  return (
    <footer className={styles.layout}>
      <div className={styles.contacts}>
        <div className={styles.hr}></div>
        <h3>Свяжитесь с нами</h3>
        <p>
          Если у вас есть вопросы или предложения, не стесняйтесь{" "}
          <span className={styles.text} onClick={handleSpanClick}>
            обращаться к нашей команде поддержки.
          </span>
        </p>
        {showContacts && (
          <div ref={contactsRef}>
            <Contacts />
          </div>
        )}
      </div>
    </footer>
  );
}
