import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  name: string;
  age: number;
  email: string;
  password: string;
  repeatPassword: string;
  gender: boolean;
  agreement: boolean;
  picture: any;
};

export default function ReactHookForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch('picture')); // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

      <input type="radio" {...register('gender')} />
      <input type="radio" {...register('gender')} />

      <input type="checkbox" {...register('agreement', { required: true })} />
      {errors.agreement && <span>This field is required.</span>}

      <input
        type="file"
        {...register('picture', {
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
      {/*{errors.picture && errors.picture.message}*/}

      <input type="submit" />
    </form>
  );
}
