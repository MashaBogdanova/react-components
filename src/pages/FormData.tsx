import React from 'react';
import { useAppSelector } from '../redux/hooks';

function FormData({ isRHF }: { isRHF?: boolean }) {
  const formData = useAppSelector((state) =>
    isRHF ? state.formData.RHFData : state.formData.data
  );

  return formData === null ? (
    <p>No data available at the moment</p>
  ) : (
    formData.map((data) => {
      return (
        <ul>
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
