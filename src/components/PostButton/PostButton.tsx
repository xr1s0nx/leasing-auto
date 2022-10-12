import React from 'react';
import styles from './PostButton.module.scss'

const PostButton = ({send}: {send: any}) => {
    return (
        <button onClick={send} className={styles.button}>
            Оставить заявку
        </button>
    );
};

export default PostButton;
