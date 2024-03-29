import React from 'react';
import { Link } from 'react-router-dom';

export default function AuthWindow(props) {
  return (
    <main className='auth'>
      <Link to='/'>
        <div className='logo button-opacity' />
      </Link>
      <h1 className='title auth__title'>{props.title}</h1>
      <form className='auth__form' onSubmit={props.submit} name={props.name}>
        {props.children}
        {props.error && (
          <span className='auth__error auth__error_type_general'>
            {props.errorText}
          </span>
        )}
        <button
          type='submit'
          className='button-opacity auth__button'
          disabled={!props.isValid}
        >
          {props.button}
        </button>
      </form>
      <p className='auth__paragraph'>
        {props.text}
        <Link className='link-opacity auth__link' to={props.toLink}>
          {props.link}
        </Link>
      </p>
    </main>
  );
}
