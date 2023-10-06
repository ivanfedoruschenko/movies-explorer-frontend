class MainApi {
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

  getUserInfo() {
    return fetch(`${this._address}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  getSavedMovies() {
    return fetch(`${this._address}/movies `, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  patchUserInfo(data) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      body: JSON.stringify({ name: data.name, email: data.email }),
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  saveMovies(movie) {
    return fetch(`${this._address}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(movie),
    }).then((res) => this._getResponseData(res));
  }

  deleteMovie(movie) {
    return fetch(`${this._address}/movies/${movie} `, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  register(name, email, password) {
    return fetch(`${this._address}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, email, password }),
    }).then((res) => this._getResponseData(res));
  }

  login(email, password) {
    return fetch(`${this._address}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then((res) => this._getResponseData(res));
  }

  authorize(token ) {
    return fetch(`${this._address}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
}

export const mainApi = new MainApi({
  baseUrl: 'https://api.movies-explorer.spb.nomoreparties.co',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  },
});
