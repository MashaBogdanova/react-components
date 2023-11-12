import React from 'react';
import styles from './preloader.module.css';

function Preloader() {
  return (
    <p className={styles.preloader} data-testid="preloader">
      Loading...
    </p>
  );
}

export default Preloader;
