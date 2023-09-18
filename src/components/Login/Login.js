import React, { useState } from 'react';
import AuthWindow from '../AuthWindow/AuthWIndow';

export default function Login(props) {
  const [formValue, setFormValue] = useState({
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
    props.onLoginUser({ ...formValue });
  };

  React.useEffect(() => {
    setFormValue({ email: '', password: '' });
  }, []);

  return (
    <AuthWindow
      title={'Рады видеть!'}
      submit={handleSubmit}
      button={'Войти'}
      register={false}
      link={'Регистрация'}
      text={'Ещё не зарегистрированы?'}
      toLink={'/signup'}
    >
      <label className='auth__label'>
        Email
        <input
          className='input auth__input'
          type='email'
          value={formValue.email}
          name='email'
          onChange={handleChange}
          placeholder='email'
          required
        />
      </label>
      <label className='auth__label auth__label_type_login'>
        Пароль
        <input
          className='input auth__input'
          type='password'
          value={formValue.password}
          name='password'
          placeholder='password'
          minLength='8'
          maxLength='20'
          onChange={handleChange}
          required
        />
      </label>
    </AuthWindow>
  );
}
