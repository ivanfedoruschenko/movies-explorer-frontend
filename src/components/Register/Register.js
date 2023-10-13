import React, { useEffect, useState } from 'react';
import AuthWindow from '../AuthWindow/AuthWIndow';
import { useForm } from '../../hooks/useForm';

export default function Register(props) {
  const { values, isValid, handleChange, resetForm, errors, setIsValid } =
    useForm();

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsValid(false);
    props.onRegisterUser({ ...values });
  };

  return (
    <AuthWindow
      title={'Добро пожаловать!'}
      submit={handleSubmit}
      button={'Зарегистрироваться'}
      link={'Войти'}
      text={'Уже зарегистрированы?'}
      toLink={'/signin'}
      error={props.error}
      errorText={props.errorText}
      isValid={isValid}
    >
      <label className='auth__label'>
        Имя
        <input
          className={`input auth__input  ${
            errors.name && 'auth__input_type_error'
          }`}
          type='text'
          value={values.name ? values.name : ''}
          name='name'
          onChange={handleChange}
          minLength='2'
          maxLength='15'
          placeholder='Имя'
          required
        />
        <span className={`auth__error ${errors.name && 'auth__error_active'}`}>
          {errors.name}
        </span>
      </label>
      <label className='auth__label'>
        Email
        <input
          className={`input auth__input  ${
            errors.email && 'auth__input_type_error'
          }`}
          type='email'
          value={values.email ? values.email : ''}
          name='email'
          pattern='^[^\s@]+@[^\s@]+\.[^\s@]{2,}$'
          onChange={handleChange}
          placeholder='Email'
          required
        />
        <span className={`auth__error ${errors.email && 'auth__error_active'}`}>
          {errors.email}
        </span>
      </label>
      <label className='auth__label auth__label_type_register'>
        Пароль
        <input
          className={`input auth__input  ${
            errors.password && 'auth__input_type_error'
          }`}
          type='password'
          value={values.password ? values.password : ''}
          name='password'
          onChange={handleChange}
          minLength='8'
          maxLength='20'
          placeholder='Пароль'
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
