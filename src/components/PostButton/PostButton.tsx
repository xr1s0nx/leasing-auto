import React from "react";
import styles from "./PostButton.module.scss";
import loader from "../../assets/loader.svg";

const PostButton = ({ send, loading }: { send: any; loading: boolean }) => {
  return (
    <button onClick={send} className={loading ? `${styles.button} ${styles.disable}` : styles.button}>
      {loading ? <img src={loader} alt=""/> : "Оставить заявку"}
    </button>
  );
};

export default PostButton;
