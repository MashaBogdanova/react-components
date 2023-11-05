import React from 'react';
import styles from './pagination.module.css';

interface IProps {
  prevUrl: string | null;
  nextUrl: string | null;
  currentPage: number;
  onPageChange: (currentPage: number) => void;
}

function Pagination({ prevUrl, nextUrl, currentPage, onPageChange }: IProps) {
  return (
    <section className={styles.pagination}>
      <button
        className={styles.button}
        disabled={prevUrl === null}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &lt;
      </button>
      <p className={styles.currentPage}>{currentPage}</p>
      <button
        className={styles.button}
        disabled={nextUrl === null}
        onClick={() => onPageChange(currentPage + 1)}
      >
        &gt;
      </button>
    </section>
  );
}

export default Pagination;
