import React, { useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import styles from '../../pages/Forms.module.css';

interface IProps {
  errorMessage?: string;
  isReactHook?: boolean;
  register?: any;
}

const CountryAutocomplete = ({
  errorMessage,
  isReactHook,
  register,
}: IProps) => {
  const countries: string[] = useAppSelector(
    (state) => state.formData.countries
  );
  const [inputValue, setInputValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
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
        {isReactHook ? (
          <input
            {...register('country')}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
        ) : (
          <input
            type="text"
            name="country"
            id="country"
            value={inputValue}
            onChange={handleInputChange}
          />
        )}
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
      {errorMessage && <div className={styles.form__error}>{errorMessage}</div>}
    </div>
  );
};

export default CountryAutocomplete;
