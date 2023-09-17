import React, { useState } from 'react';

export default function SearchForm(props) {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;

    setSearchValue({
      ...searchValue,
      value,
    });
  };

  React.useEffect(() => {
    setSearchValue('');
  }, []);

  return (
    <form className='search-form'>
      <div className='search-form__container'>
        <div className='search-form__icon'></div>
        <input
          onChange={handleChange}
          className='search-form__input'
          type='text'
          placeholder='Фильм'
          required
        />
        <button type='submit' className='button-opacity search-form__button'>
          Найти
        </button>
      </div>
      <div className='search-form__wrapper'>
        <label className='search-form__label'>
          <input className='search-form__checkbox' type='checkbox' />
          <span className='button-opacity search-form__pseudo-checkbox round'></span>
        </label>
        <p className='search-form__text'>Короткометражки</p>
      </div>
    </form>
  );
}
