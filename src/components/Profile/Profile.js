import { Link } from 'react-router-dom';
import React, { useState } from 'react';

export default function Profile() {
  const [isEdit, setIsEdit] = useState(false);
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  React.useEffect(() => {
    setFormValue({ name: '', email: '' });
  }, []);
  const handleClickEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <main className='profile'>
      <section className='profile__container'>
        <h1 className='title'>Привет, Виталий!</h1>

        <form className='profile__form'>
          <label className='profile__label'>
            Имя
            <input
              onChange={handleChange}
              className='input profile__input'
              value='Виталий'
              placeholder='Виталий'
              minLength='2'
              maxLength='20'
            />
          </label>
          <label className='profile__label'>
            Email
            <input
              onChange={handleChange}
              className='input profile__input'
              value='pochta@yandex.ru'
              placeholder='pochta@yandex.ru'
            />
          </label>
        </form>

        {isEdit ? (
          <div className='profile__btn-container'>
            <p className='profile__error'>
              При обновлении профиля произошла ошибка.
            </p>
            <button type='submit' className='button-opacity profile__btn-save'>
              Сохранить
            </button>
          </div>
        ) : (
          <div className='profile__btn-container'>
            <button
              onClick={handleClickEdit}
              type='button'
              className='link-opacity profile__edit'
            >
              Редактировать
            </button>
            <Link to='/' className='link-opacity profile__link'>
              Выйти из аккаунта
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
