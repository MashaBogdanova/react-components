import React from 'react';
import { useAppSelector } from '../redux/hooks';
import styles from './FormData.module.css';

function FormData() {
  const formData = useAppSelector((state) => state.formData.data);

  return formData === null ? (
    <p>No data available at the moment</p>
  ) : (
    formData.map((data, index) => {
      return (
        <ul key={data?.name} className={index === 0 ? styles.data_lastItem : ''}>
          <li>Name: {data?.name}</li>
          <li>Age: {data?.age}</li>
          <li>Password: {data?.password}</li>
          <li>E-mail: {data?.email}</li>
          <li>Gender: {data?.gender}</li>
        </ul>
      );
    })
  );
}

export default FormData;
