class MoviesApi {
  constructor(setting) {
    this._address = setting.baseUrl;
    this._headers = setting.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getMovies() {
    return fetch(`${this._address}`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }
}

export const moviesApi = new MoviesApi({
  baseUrl: ' https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
