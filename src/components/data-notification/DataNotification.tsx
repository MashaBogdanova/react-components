import React from 'react';
import styles from './dataNotification.module.css';

function DataNotification() {
  return (
    <p className={styles.notification}>
      Congratulations! New data has been added!
    </p>
  );
}

export default DataNotification;
