import React from 'react';
import { useAppSelector } from '../redux/hooks';

function FormData({ isRHF }: { isRHF?: boolean }) {
  const formData = useAppSelector((state) =>
    isRHF ? state.formData.RHFData : state.formData.data
  );
  const file = formData?.avatar;
  console.log(formData);

  return formData === null ? (
    <p>No data available at the moment</p>
  ) : (
    <ul>
      <li>Name: {formData?.name}</li>
      <li>Age: {formData?.age}</li>
      <li>E-mail: {formData?.email}</li>
      <li>Gender: {formData?.gender}</li>

      {/*{file}*/}
    </ul>
  );
}

export default FormData;
