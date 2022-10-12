import React from 'react';
import styles from './Result.module.scss'

const Result = ({title, value}: {title: string, value: number}) => {
    return (
        <div className={styles.ResultBlock}>
            <p className={styles.title}>{title}</p>
            <p className={styles.value}>{value
                .toString()
                .replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + " ")} ₽</p>
        </div>
    );
};

export default Result;
