import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';

export default function SearchForm(props) {
  function handleChangeValue(e) {
    props.setSearchText(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (props.searchMovie(props.searchText)) {
      props.setPreload();
      props.searchMovie(props.searchText);
    }
  }

  return (
    <form className='search-form' onSubmit={handleSubmit} noValidate>
      <div className='search-form__container'>
        <div className='search-form__icon'></div>
        <input
          onChange={handleChangeValue}
          className='search-form__input'
          type='text'
          name='search'
          value={props.searchText || ''}
          placeholder='Фильм'
          minLength='1'
          required
        />
        {props.error && (
          <span className='auth__error'>{props.errorSearch}</span>
        )}
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
