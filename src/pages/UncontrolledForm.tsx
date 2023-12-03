import React from 'react';
import styles from './Forms.module.css';
import { SubmitHandler } from 'react-hook-form';
import { setDataAdded, setRHFData } from '../redux/formDataSlice';
import {useAppDispatch} from "../redux/hooks";
import {useNavigate} from "react-router-dom";

function UncontrolledForm() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    // console.log(event.target.name.value);
    // const formData = { ...data, avatar: data.avatar[0].name };
    // dispatch(setRHFData(formData));
    // navigate('/');
    // dispatch(setDataAdded(true));
    // setTimeout(() => {
    //   dispatch(setDataAdded(false));
    // }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <fieldset className={styles.form__fieldset}>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" name="name"/>
        <label htmlFor="age">Your age</label>
        <input type="number" id="age" name="age"/>
      </fieldset>
      <fieldset className={styles.form__fieldset}>
        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" name="email"/>
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
