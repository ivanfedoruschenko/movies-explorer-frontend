import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useForm } from '../../hooks/useForm';

export default function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const { isValid, values, errors, handleChange, setValues, resetForm } =
    useForm();

  React.useEffect(() => {
    resetForm();
  }, [resetForm]);

  React.useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [setValues]);

  const buttonIsValid =
    isValid &&
    (values.name !== currentUser.name || values.email !== currentUser.email);

  const handleSubmit = (e) => {
    e.preventDefault();

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
          <label className='profile__label'>
            Имя
            <input
              onChange={handleChange}
              className='input profile__input'
              type='text'
              value={values.name ? values.name : ''}
              name='name'
              placeholder='Имя'
              minLength='2'
              maxLength='20'
              disabled={!props.isEdit}
            />
          </label>
          <label className='profile__label'>
            Email
            <input
              onChange={handleChange}
              name='email'
              type='email'
              className='input profile__input'
              value={values.email ? values.email : ''}
              placeholder='Email'
              pattern='^[^\s@]+@[^\s@]+\.[^\s@]{2,}$'
              disabled={!props.isEdit}
            />
          </label>
          {props.isEdit ? (
            <div className='profile__btn-container'>
              {errors && <p className='profile__error'>{props.errorText}</p>}
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
