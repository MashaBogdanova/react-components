import React, { useRef } from 'react';
import styles from './Forms.module.css';
import { setData, setDataAdded } from '../redux/formDataSlice';
import { useAppDispatch } from '../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { IInputs } from '../types/types';

function UncontrolledForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const data: IInputs = {
        name: formData.get('name') as string,
        age: parseInt(formData.get('age') as string, 10),
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        repeatPassword: formData.get('repeatPassword') as string,
        gender: formData.get('gender') as string,
        agreement: formData.get('agreement') as unknown,
        avatar: formData.get('avatar') as any,
      };
      dispatch(setData(data));
      navigate('/');
      dispatch(setDataAdded(true));
      setTimeout(() => {
        dispatch(setDataAdded(false));
      }, 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef} className={styles.form}>
      <fieldset className={styles.form__fieldset}>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="age">Your age</label>
        <input type="number" id="age" name="age" />
      </fieldset>
      <fieldset className={styles.form__fieldset}>
        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" name="email" />
      </fieldset>
      <fieldset className={styles.form__fieldset}>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
        <label htmlFor="repeatPassword">Repeat password</label>
        <input type="password" id="repeatPassword" />
      </fieldset>
      <fieldset className={styles.form__fieldset}>
        <label htmlFor="female">Female</label>
        <input type="radio" id="female" name="gender" />
        <label htmlFor="male">Male</label>
        <input type="radio" id="male" name="gender" />
      </fieldset>
      <fieldset className={styles.form__fieldset}>
        <label htmlFor="avatar">Your avatar</label>
        <input type="file" id="avatar" />
      </fieldset>
      <fieldset className={styles.form__fieldset}>
        <input type="checkbox" id="agreement" />
        <label htmlFor="agreement">I agree with terms and conditions</label>
      </fieldset>
      <fieldset className={styles.form__fieldset}>
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </fieldset>
    </form>
  );
}

export default UncontrolledForm;
