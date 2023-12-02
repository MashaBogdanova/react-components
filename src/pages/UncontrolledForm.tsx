import React from 'react';
import styles from './Forms.module.css';

function UncontrolledForm() {
  const handleSubmit = () => {};

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <fieldset className={styles.form__fieldset}>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" />
        <label htmlFor="age">Your age</label>
        <input type="number" id="age" />
      </fieldset>
      <fieldset className={styles.form__fieldset}>
        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" />
      </fieldset>
      <fieldset className={styles.form__fieldset}>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
        <label htmlFor="repeatPassword">Repeat password</label>
        <input type="password" id="repeatPassword" />
      </fieldset>
      <fieldset className={styles.form__fieldset}>
        <label htmlFor="female">Female</label>
        <input type="radio" id="female" name="gender" checked/>
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
      <button type="submit">Submit</button>
    </form>
  );
}

export default UncontrolledForm;
