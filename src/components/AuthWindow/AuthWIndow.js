import React from 'react';
import { Link } from 'react-router-dom';

export default function AuthWindow(props) {
  return (
    <section className='auth'>
      <div className='logo'></div>
      <h2 className='title auth__title'>{props.title}</h2>
      <form className='auth__form' onSubmit={props.submit} name={props.name}>
        {props.children}
        <button type='submit' className='button-opacity auth__button'>
          {props.button}
        </button>
      </form>
      <p className='auth__paragraph'>
        {props.text}
        <Link className='link-opacity auth__link' to={props.toLink}>
          {props.link}
        </Link>
      </p>
    </section>
  );
}
