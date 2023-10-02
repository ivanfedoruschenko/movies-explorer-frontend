import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { useState } from 'react';

export default function SavedMovies(props) {
  return (
    <main className='movies'>
      <SearchForm
        showNoResults={props.showNoResults}
        searchMovie={props.searchMovie}
        checkboxChecked={props.checkboxChecked}
        changeCheckbox={props.changeCheckbox}
        movies={props.foundedMovies}
        setPreload={props.setPreload}
        shortMovie={props.shortMovie}
        searchText={props.searchText}
        setSearchText={props.setSearchText}
      />
      <MoviesCardList
        saveMovie={props.saveMovie}
        noResult={props.noResult}
        inSearch={props.inSearch}
        foundedMovies={props.foundedMovies}
        movies={props.savedMovies}
        savedMovies={props.savedMovies}
        isLiked={props.isLiked}
        deleteMovie={props.deleteMovie}
      />
    </main>
  );
}
