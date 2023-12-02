import React from 'react';
import { useAppSelector } from '../redux/hooks';

function FormData() {
  const formData = useAppSelector((state) => state.formData.RHFData);
  console.log(formData);
  return formData === null ? (
    <p>No data available at the moment</p>
  ) : (
    <ul>
      <li>Name: {formData?.name}</li>
      <li>Age: {formData?.age}</li>
      <li>E-mail: {formData?.email}</li>
      <li>Password: {formData?.password}</li>
      <li>Gender: {formData?.gender}</li>
      <li>
        Avatar: <img src={formData?.avatar} />
      </li>
    </ul>
  );
}

export default FormData;
