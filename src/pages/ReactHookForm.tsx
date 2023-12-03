import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './Forms.module.css';
import { setData, setDataAdded } from '../redux/formDataSlice';
import { useAppDispatch } from '../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { IInputs } from '../types/types';
import schema from '../validation/formValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import CountryAutocomplete from "../components/country-autocomplete/CountryAutocomplete";

export default function ReactHookForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IInputs> = (data) => {
    dispatch(setData(data));
    navigate('/');
    dispatch(setDataAdded(true));
    setTimeout(() => {
      dispatch(setDataAdded(false));
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h1>React Hook Form</h1>
      <div className={styles.form__block}>
        <div className={styles.form__fieldset}>
          <label>Your name</label>
          <input {...register('name')} />

          <label>Your age</label>
          <input type="number" {...register('age')} />
        </div>
        <div className={styles.form__error}>
          {errors.name && errors.name.message}
        </div>
        <div className={styles.form__error}>
          {errors.age && errors.age.message}
        </div>
      </div>
      <div className={styles.form__block}>
        <div className={styles.form__fieldset}>
          <label>E-mail</label>
          <input {...register('email')} />
        </div>
        <div className={styles.form__error}>
          {errors.email && errors.email.message}
        </div>
      </div>
      <div className={styles.form__block}>
        <div className={styles.form__fieldset}>
          <label>Password</label>
          <input {...register('password')} />

          <label>Repeat password</label>
          <input {...register('repeatPassword')} />
        </div>
        <div className={styles.form__error}>
          {errors.password && errors.password.message}
        </div>
        <div className={styles.form__error}>
          {errors.repeatPassword && errors.repeatPassword.message}
        </div>
      </div>
      <div className={styles.form__block}>
        <div className={styles.form__fieldset}>
          <label>Female</label>
          <input type="radio" value="female" {...register('gender')} />
          <label>Male</label>
          <input type="radio" value="male" {...register('gender')} />
        </div>
        <div className={styles.form__error}>
          {errors.gender && errors.gender.message}
        </div>
      </div>
      {/*<div className={styles.form__fieldset}>*/}
      {/*  <label>Your avatar</label>*/}
      {/*  <input*/}
      {/*    type="file"*/}
      {/*    {...register('avatar', {*/}
      {/*      validate: {*/}
      {/*        extension: (v) =>*/}
      {/*          v[0].type === 'image/jpeg' ||*/}
      {/*          v[0].type === 'image/png' ||*/}
      {/*          'Please upload an image in JPEG or PNG format.',*/}
      {/*        size: (v) =>*/}
      {/*          v[0].size <= 1024 * 1024 ||*/}
      {/*          'Please make sure the image size is within the limit of 1MB.',*/}
      {/*      },*/}
      {/*    })}*/}
      {/*  />*/}
      {/*  /!*{errors.avatar && errors.avatar.message}*!/*/}
      {/*</div>*/}
      <div className={styles.form__block}>
        <div className={styles.form__fieldset}>
          <label>I agree with terms and conditions:</label>
          <input type="checkbox" {...register('agreement')} />
        </div>
        <div className={styles.form__error}>
          {errors.agreement && errors.agreement.message}
        </div>
      </div>
      <input {...register('country')} />
      <div className={styles.form__fieldset}>
        <input type="submit" />
        <input type="reset" />
      </div>
    </form>
  );
}
