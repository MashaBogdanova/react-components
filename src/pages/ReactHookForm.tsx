import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './Forms.module.css';
import {setData, setRHFData} from '../redux/formDataSlice';
import { useAppDispatch } from '../redux/hooks';
import { useNavigate } from 'react-router-dom';

type Inputs = {
  name: string;
  age: number;
  email: string;
  password: string;
  repeatPassword: string;
  gender: boolean;
  agreement: boolean;
  avatar: any;
};

export default function ReactHookForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    const formData = { ...data, avatar: data.avatar[0].name };
    dispatch(setRHFData(formData));
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <fieldset className={styles.form__fieldset}>
        <label>Your name</label>
        <input
          {...register('name', {
            pattern: {
              value: /^[A-Z].*$/,
              message:
                'Name should begins with a capital letter. Please enter a valid name accordingly.',
            },
          })}
        />
        {errors.name && errors.name.message}

        <label>Your age</label>
        <input
          type="number"
          {...register('age', {
            valueAsNumber: true,
            validate: {
              positive: (v) =>
                v > 0 ||
                'Age should be greater than 0. Please enter a valid age accordingly',
              integer: (v) =>
                Number.isInteger(v) ||
                'Age should be an integer. Please enter a valid age accordingly',
            },
          })}
        />
        {errors.age && errors.age.message}
      </fieldset>

      <fieldset className={styles.form__fieldset}>
        <label>E-mail</label>
        <input
          {...register('email', {
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message:
                'Please enter a valid email address. Ensure it follows the standard format, such as user@example.com.',
            },
          })}
        />
        {errors.email && errors.email.message}
      </fieldset>

      <fieldset className={styles.form__fieldset}>
        <label>Password</label>
        <input
          {...register('password', {
            pattern: {
              value:
                /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+])[0-9A-Za-z!@#$%^&*()_+]+$/,
              message:
                'Please enter a valid Password. Ensure it contains 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character.',
            },
          })}
        />
        {errors.password && errors.password.message}

        <label>Repeat password</label>
        <input
          {...register('repeatPassword', {
            pattern: {
              value:
                /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+])[0-9A-Za-z!@#$%^&*()_+]+$/,
              message:
                'Please enter a valid Password. Ensure it contains 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character.',
            },
            validate: (v) =>
              v === watch('password') ||
              'Passwords do not match. Please ensure that the entered passwords match exactly.',
          })}
        />
        {errors.repeatPassword && errors.repeatPassword.message}
      </fieldset>
      <fieldset className={styles.form__fieldset}>
        <label>Female</label>
        <input type="radio" value="female" {...register('gender')} checked />
        <label>Male</label>
        <input type="radio" value="male" {...register('gender')} />
      </fieldset>
      <fieldset className={styles.form__fieldset}>
        <label>Your avatar</label>
        <input
          type="file"
          {...register('avatar', {
            validate: {
              extension: (v) =>
                v[0].type === 'image/jpeg' ||
                v[0].type === 'image/png' ||
                'Please upload an image in JPEG or PNG format.',
              size: (v) =>
                v[0].size <= 1024 * 1024 ||
                'Please make sure the image size is within the limit of 1MB.',
            },
          })}
        />
        {/*{errors.avatar && errors.avatar.message}*/}
      </fieldset>
      <fieldset className={styles.form__fieldset}>
        <label>I agree with terms and conditions:</label>
        <input type="checkbox" {...register('agreement', { required: true })} />
        {errors.agreement && <span>This field is required.</span>}
      </fieldset>
      <fieldset className={styles.form__fieldset}>
        <input type="submit" />
        <input type="reset" />
      </fieldset>
    </form>
  );
}
