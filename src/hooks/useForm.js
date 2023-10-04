import React, { useCallback } from 'react';

const regexName = /^[a-zA-Zа-яА-Я\sё-]+$/;
const regexEmail = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/;

export function useForm() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    const isName = name === 'name';
    const isEmail = name === 'email';
    const isNameValidation = isName ? regexName.test(value) : true;
    const isEmailValidation = isEmail ? regexEmail.test(value) : true;

    const error =
      !isNameValidation && !isEmailValidation
        ? event.target.validationMessage || 'Использованы недопустимые символы.'
        : event.target.validationMessage;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: error });
    setIsValid(isNameValidation && target.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setErrors,
    setIsValid,
  };
}
