import React, { useEffect, useState } from 'react';
import AuthWindow from '../AuthWindow/AuthWIndow';
import { useForm } from '../../hooks/useForm';

export default function Register(props) {
  const { values, isValid, handleChange, resetForm } = useForm();

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
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
      error={isValid}
    >
      <label className='auth__label'>
        Имя
        <input
          className='input auth__input'
          type='text'
          value={values.name ? values.name : ''}
          name='name'
          onChange={handleChange}
          minLength='2'
          maxLength='15'
          placeholder='Имя'
          required
        />
      </label>
      <label className='auth__label'>
        Email
        <input
          className='input auth__input'
          type='email'
          value={values.email ? values.email : ''}
          name='email'
          onChange={handleChange}
          placeholder='Email'
          required
        />
      </label>
      <label className='auth__label auth__label_type_register'>
        Пароль
        <input
          className={`input auth__input  ${
            !isValid && 'auth__input_type_error'
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
        {!isValid && <span className='auth__error'>{props.errorText}</span>}
      </label>
    </AuthWindow>
  );
}
