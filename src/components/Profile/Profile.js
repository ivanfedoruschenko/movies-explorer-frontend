import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleValidation = (check) => {
    if (check) {
      props.setError(false);
    } else {
      props.setError(true);
    }
  };

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
    handleValidation(e.target.closest('form').checkValidity());
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
    handleValidation(e.target.closest('form').checkValidity());
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onUpdateUser({
      name: name,
      email: email,
    });
  };
  return (
    <main className='profile'>
      <section className='profile__container'>
        <h1 className='title'>Привет, {name}!</h1>

        <form className='profile__form' onSubmit={handleSubmit}>
          <label className='profile__label'>
            Имя
            <input
              onChange={handleChangeName}
              className='input profile__input'
              type='text'
              value={name || ''}
              placeholder='Имя'
              minLength='2'
              maxLength='20'
              disabled={!props.isEdit}
            />
          </label>
          <label className='profile__label'>
            Email
            <input
              onChange={handleChangeEmail}
              type='email'
              className='input profile__input'
              value={email || ''}
              placeholder='Email'
              disabled={!props.isEdit}
            />
          </label>
          {props.isEdit ? (
            <div className='profile__btn-container'>
              {props.error && (
                <p className='profile__error'>{props.errorText}</p>
              )}
              <button
                type='submit'
                className='button-opacity profile__btn-save'
                disabled={props.error}
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
