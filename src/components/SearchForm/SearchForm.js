import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function SearchForm(props) {
  function handleChangeValue(e) {
    props.setSearchText(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.setPreload();
    props.searchMovie(props.searchText);
    props.showNoResults();
  }

  return (
    <form className='search-form' onSubmit={handleSubmit}>
      <div className='search-form__container'>
        <div className='search-form__icon'></div>
        <input
          onChange={handleChangeValue}
          className='search-form__input'
          type='text'
          value={props.searchText || ''}
          placeholder='Фильм'
          required
        />
        <button type='submit' className='button-opacity search-form__button'>
          Найти
        </button>
      </div>
      <div className='search-form__wrapper'>
        <label className='search-form__label'>
          <input
            className='search-form__checkbox'
            checked={props.checkboxChecked}
            onChange={props.changeCheckbox}
            type='checkbox'
          />
          <span className='button-opacity search-form__pseudo-checkbox'></span>
        </label>
        <p className='search-form__text'>Короткометражки</p>
      </div>
    </form>
  );
}
