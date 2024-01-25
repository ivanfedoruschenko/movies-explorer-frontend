import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useForm } from '../../hooks/useForm';

export default function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const {
    isValid,
    values,
    errors,
    handleChange,
    setValues,
    resetForm,
    setIsValid,
  } = useForm();

  React.useEffect(() => {
    resetForm();
  }, [resetForm]);

  React.useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [setValues, currentUser.name, currentUser.email]);

  const buttonIsValid =
    isValid &&
    (values.name !== currentUser.name || values.email !== currentUser.email);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsValid(false);
    props.onUpdateUser({
      name: values.name,
      email: values.email,
    });
  };
  return (
    <main className='profile'>
      <section className='profile__container'>
        <h1 className='title'>Привет, {currentUser.name}!</h1>

        <form className='profile__form' onSubmit={handleSubmit}>
          <label className='profile__label profile__label_type_underline'>
            Имя
            <input
              onChange={handleChange}
              className={`input profile__input ${
                errors.name && 'profile__input_type_error'
              }`}
              type='text'
              value={values.name ? values.name : ''}
              name='name'
              placeholder='Имя'
              minLength='2'
              maxLength='20'
              disabled={!props.isEdit}
            />
          </label>
          <span
            className={`auth__error ${errors.name && 'auth__error_active'}`}
          >
            {errors.name}
          </span>
          <label className='profile__label profile__label_type_position'>
            Email
            <input
              onChange={handleChange}
              name='email'
              type='email'
              className={`input profile__input ${
                errors.email && 'profile__input_type_error'
              }`}
              value={values.email ? values.email : ''}
              placeholder='Email'
              pattern='^[^\s@]+@[^\s@]+\.[^\s@]{2,}$'
              disabled={!props.isEdit}
            />
          </label>
          <span
            className={`auth__error ${errors.email && 'auth__error_active'}`}
          >
            {errors.email}
          </span>
          {props.isEdit ? (
            <div className='profile__btn-container'>
              {props.error && (
                <p className='profile__error'>{props.errorText}</p>
              )}
              {props.confirmation && (
                <span className='profile__confirmation'>
                  Данные успешно сохранены
                </span>
              )}
              <button
                type='submit'
                className='button-opacity profile__btn-save'
                disabled={!buttonIsValid}
              >
                Сохранить
              </button>
            </div>
          ) : (
            ''
          )}
        </form>
        {!props.isEdit && (
          <div className='profile__btn-container'>
            <button
              onClick={props.editProfile}
              type='button'
              className='link-opacity profile__edit'
            >
              Редактировать
            </button>
            <Link
              to='/'
              onClick={props.signOut}
              className='link-opacity profile__link'
            >
              Выйти из аккаунта
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
