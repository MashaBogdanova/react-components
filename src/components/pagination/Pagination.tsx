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
        disabled={prevUrl === null}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &lt;
      </button>
      <button
        disabled={nextUrl === null}
        onClick={() => onPageChange(currentPage + 1)}
      >
        &gt;
      </button>
    </section>
  );
}

export default Pagination;
