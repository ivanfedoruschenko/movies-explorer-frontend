import React, { useState } from 'react';
import AuthWindow from '../AuthWindow/AuthWIndow';

export default function Register(props) {
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onRegisterUser({ ...formValue });
  };

  return (
    <AuthWindow
      title={'Добро пожаловать!'}
      submit={handleSubmit}
      button={'Зарегистрироваться'}
      link={'Войти'}
      text={'Уже зарегистрированы?'}
      toLink={'/signin'}
    >
      <label className='auth__label'>
        Имя
        <input
          className='input auth__input'
          type='text'
          value={formValue.name}
          name='name'
          onChange={handleChange}
          minLength='2'
          maxLength='15'
          placeholder='Имя'
          required
        />
        <span></span>
      </label>
      <label className='auth__label'>
        Email
        <input
          className='input auth__input'
          type='email'
          value={formValue.email}
          name='email'
          onChange={handleChange}
          placeholder='Email'
          required
        />
      </label>
      <label className='auth__label auth__label_type_register'>
        Пароль
        <input
          className='input auth__input auth__input_type_error'
          type='password'
          value={formValue.password}
          name='password'
          onChange={handleChange}
          minLength='8'
          maxLength='20'
          placeholder='Пароль'
          required
        />
        <span className='auth__error'>Что-то пошло не так...</span>
      </label>
    </AuthWindow>
  );
}
