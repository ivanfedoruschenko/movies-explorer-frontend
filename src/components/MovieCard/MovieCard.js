import cardImg from '../../images/movie-card__img.png';
import { useState } from 'react';

export default function MovieCard() {
  const [isLiked, setIsLiked] = useState(false);
  function handleLikeClick() {
    setIsLiked(!isLiked);
  }

  const likeClassname = `button-opacity movie-card__like ${
    isLiked ? 'movie-card__like_type_active' : 'movie-card__like_type_disable'
  }`;
  return (
    <div className='movie-card'>
      <img className='movie-card__img' src={cardImg} alt='Постер' />
      <div className='movie-card__container'>
        <h2 className='movie-card__name'>33 слова о дизайне</h2>
        <button onClick={handleLikeClick} className={likeClassname} />
      </div>
      <span className='movie-card__duration'>1ч52м</span>
    </div>
  );
}
