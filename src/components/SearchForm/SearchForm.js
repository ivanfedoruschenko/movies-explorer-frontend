export default function SearchForm() {
  return (
    <form action='' className='search-form'>
      <div className='search-form__container'>
        <div className='search-form__icon'></div>
        <input className='search-form__input' type='text' placeholder='Фильм' />
        <button className='search-form__button'>Найти</button>
      </div>
      <div className='search-form__wrapper'>
        <label className='search-form__label'>
          <input className='search-form__checkbox' type='checkbox' />
          <span className='search-form__pseudo-checkbox round'></span>
        </label>
        <p className='search-form__text'>Короткометражки</p>
      </div>
    </form>
  );
}
