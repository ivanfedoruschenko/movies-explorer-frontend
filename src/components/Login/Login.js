import React, { useEffect, useState } from 'react';
import AuthWindow from '../AuthWindow/AuthWIndow';
import { useForm } from '../../hooks/useForm';

export default function Login(props) {
  const { values, isValid, handleChange, resetForm } = useForm();

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
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
      error={isValid}
    >
      <label className='auth__label'>
        Email
        <input
          className='input auth__input'
          type='email'
          value={values.email ? values.email : ''}
          name='email'
          onChange={handleChange}
          placeholder='email'
          required
        />
      </label>
      <label className='auth__label auth__label_type_login'>
        Пароль
        <input
          className={`input auth__input  ${
            !isValid && 'auth__input_type_error'
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
        {!isValid && <span className='auth__error'>{props.errorText}</span>}
      </label>
    </AuthWindow>
  );
}
