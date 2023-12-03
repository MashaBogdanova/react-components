import { boolean, number, object, ref, string } from 'yup';

const schema = object().shape({
  name: string()
    .required('Name is a required field')
    .matches(/^[A-Z].*$/, {
      excludeEmptyString: true,
      message:
        'Name should begins with a capital letter. Please enter a valid name accordingly',
    }),
  age: number()
    .required('Age is a required field')
    .positive(
      'Age should be greater than 0. Please enter a valid age accordingly'
    )
    .integer('Age should be an integer. Please enter a valid age accordingly'),
  email: string()
    .required('E-mail is a required field')
    .email(
      'Please enter a valid email address. Ensure it follows the standard format, such as user@example.com'
    ),
  password: string()
    .required('Password is a required field')
    .matches(
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+])[0-9A-Za-z!@#$%^&*()_+]+$/,
      {
        message:
          'Please enter a valid Password. Ensure it contains 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character',
      }
    ),
  repeatPassword: string()
    .required('Please repeat the password')
    .oneOf([ref('password'), ''], "Passwords don't match. Please try again"),
  gender: string().required('Choose one of the following options'),
  avatar: string(),
  agreement: string().matches(/\bagree\b/i, {
    message: 'To proceed you should be agreed with terms and conditions',
  }),
  country: string().required('Please choose the country'),
});

export default schema;
