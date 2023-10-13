import React, { useEffect, useState } from 'react';
import AuthWindow from '../AuthWindow/AuthWIndow';
import { useForm } from '../../hooks/useForm';

export default function Login(props) {
  const { values, isValid, handleChange, resetForm, errors, setIsValid } =
    useForm();

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsValid(false);
    props.onLoginUser({ ...values });
  };

  return (
    <AuthWindow
      title={'Рады видеть!'}
      submit={handleSubmit}
      button={'Войти'}
      register={false}
      link={'Регистрация'}
      text={'Ещё не зарегистрированы?'}
      toLink={'/signup'}
      isValid={isValid}
      error={props.error}
      errorText={props.errorText}
    >
      <label className='auth__label'>
        Email
        <input
          className={`input auth__input  ${
            errors.email && 'auth__input_type_error'
          }`}
          type='email'
          value={values.email ? values.email : ''}
          name='email'
          onChange={handleChange}
          placeholder='email'
          pattern='^[^\s@]+@[^\s@]+\.[^\s@]{2,}$'
          required
        />
        <span className={`auth__error ${errors.email && 'auth__error_active'}`}>
          {errors.email}
        </span>
      </label>
      <label className='auth__label auth__label_type_login'>
        Пароль
        <input
          className={`input auth__input  ${
            errors.password && 'auth__input_type_error'
          }`}
          type='password'
          value={values.password ? values.password : ''}
          name='password'
          placeholder='password'
          minLength='8'
          maxLength='20'
          onChange={handleChange}
          required
        />
        <span
          className={`auth__error ${errors.password && 'auth__error_active'}`}
        >
          {errors.password}
        </span>
      </label>
    </AuthWindow>
  );
}
