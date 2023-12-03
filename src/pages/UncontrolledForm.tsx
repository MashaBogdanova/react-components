import React, { useRef, useState } from 'react';
import styles from './Forms.module.css';
import { setData, setDataAdded } from '../redux/formDataSlice';
import { useAppDispatch } from '../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { IInputs } from '../types/types';
import schema from '../validation/formValidation';
import { ValidationError } from 'yup';

interface IErrors {
  [key: string]: string;
}

function UncontrolledForm() {
  const [errors, setErrors] = useState<IErrors>({});
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
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
        gender: formData.get('gender') as 'female' | 'male',
        // avatar: formData.get('avatar') as any,
        agreement: formData.get('agreement') as 'agree',
      };
      try {
        const isValidate = schema.validateSync(data, { abortEarly: false });
        if (isValidate) {
          dispatch(setData(data));
          navigate('/');
          dispatch(setDataAdded(true));
          setTimeout(() => {
            dispatch(setDataAdded(false));
          }, 2000);
        }
      } catch (validateError: unknown) {
        if (validateError instanceof ValidationError) {
          const errors: IErrors = {};
          for (const error of validateError.inner) {
            if (error.path) {
              errors[error.path] = error.message;
            }
          }
          setErrors(errors);
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef} className={styles.form}>
      <div className={styles.form__block}>
        <div className={styles.form__fieldset}>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" name="name" />

          <label htmlFor="age">Your age</label>
          <input type="number" id="age" name="age" />
        </div>
        {errors.name && <div className={styles.form__error}>{errors.name}</div>}
        {errors.age && <div className={styles.form__error}>{errors.age}</div>}
      </div>

      <div className={styles.form__block}>
        <div className={styles.form__fieldset}>
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" name="email" />
        </div>
        {errors.email && (
          <div className={styles.form__error}>{errors.email}</div>
        )}
      </div>
      <div className={styles.form__block}>
        <div className={styles.form__fieldset}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
          <label htmlFor="repeatPassword">Repeat password</label>
          <input type="password" id="repeatPassword" name="repeatPassword" />
        </div>
        {errors.password && (
          <div className={styles.form__error}>{errors.password}</div>
        )}
        {errors.repeatPassword && (
          <div className={styles.form__error}>{errors.repeatPassword}</div>
        )}
      </div>
      <div className={styles.form__block}>
        <div className={styles.form__fieldset}>
          <label htmlFor="female">Female</label>
          <input type="radio" id="female" name="gender" value="female" />
          <label htmlFor="male">Male</label>
          <input type="radio" id="male" name="gender" value="male" />
        </div>
        {errors.gender && (
          <div className={styles.form__error}>{errors.gender}</div>
        )}
      </div>
      {/*<div className={styles.form__fieldset}>*/}
      {/*  <label htmlFor="avatar">Your avatar</label>*/}
      {/*  <input type="file" id="avatar" />*/}
      {/*</div>*/}
      <div className={styles.form__block}>
        <div className={styles.form__fieldset}>
          <input
            type="checkbox"
            id="agreement"
            name="agreement"
            value="agree"
          />
          <label htmlFor="agreement">I agree with terms and conditions</label>
        </div>
        {errors.agreement && (
          <div className={styles.form__error}>{errors.agreement}</div>
        )}
      </div>
      <div className={styles.form__fieldset}>
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </div>
    </form>
  );
}

export default UncontrolledForm;
