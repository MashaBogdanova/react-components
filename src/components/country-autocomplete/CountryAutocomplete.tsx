import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import styles from '../../pages/Forms.module.css';
import { IErrors } from '../../types/types';

interface IProps {
  errors: IErrors;
}

const CountryAutocomplete = ({ errors }: IProps) => {
  const countries: string[] = useAppSelector(
    (state) => state.formData.countries
  );
  const [inputValue, setInputValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isError, setError] = useState<boolean>(!!errors);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setError(false);
    setInputValue(value);

    const filteredSuggestions =
      value.trim() === ''
        ? []
        : countries.filter((country) =>
            country.toLowerCase().startsWith(value.toLowerCase())
          );

    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setSuggestions([]);
  };

  return (
    <div className={styles.form__block}>
      <div className={styles.form__fieldset}>
        <label htmlFor="country">Country</label>
        <input
          type="text"
          name="country"
          id="country"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      {isError && errors.country && (
        <div className={styles.form__error}>{errors.country}</div>
      )}
    </div>
  );
};

export default CountryAutocomplete;
