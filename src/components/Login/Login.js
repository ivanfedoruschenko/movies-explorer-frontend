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
      toLink={'/sign-up'}
    >
      <label className='auth__label'>
        Email
        <input
          className='input auth__input'
          type='email'
          value={formValue.email}
          name='email'
          onChange={handleChange}
          required
        />
      </label>
      <label className='auth__label'>
        Пароль
        <input
          className='input auth__input'
          type='password'
          value={formValue.password}
          name='password'
          onChange={handleChange}
          required
        />
        <span></span>
      </label>
    </AuthWindow>
  );
}
