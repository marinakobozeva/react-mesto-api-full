class Api {
  constructor(options) {
    this._options = options;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }

    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards(token) {
    return fetch(`${this._options.baseUrl}/cards`,
      {
        headers: {
          ...this._options.headers,
          "Authorization" : `Bearer ${token}`,
        }
      }
    )
      .then(this._checkResponse)
  }

  getPersonalInformation(token) {
    return fetch(`${this._options.baseUrl}/users/me`,
      {
        headers: {
          ...this._options.headers,
          "Authorization" : `Bearer ${token}`,
        }
      }
    )
      .then(this._checkResponse)
  }

  changePersonalInformation({ name, info }, token) {
    return fetch(`${this._options.baseUrl}/users/me`,
      {
        method: 'PATCH',
        headers: {
          ...this._options.headers,
          "Authorization" : `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
          about: info,
        })
      })
      .then(this._checkResponse)
  }

  changeAvatar(avatarUrl, token) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`,
      {
        method: 'PATCH',
        headers: {
          ...this._options.headers,
          "Authorization" : `Bearer ${token}`,
        },
        body: JSON.stringify({
          avatar: avatarUrl,
        })
      })
      .then(this._checkResponse)
  }

  deleteCard(cardId, token) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}`,
      {
        method: 'DELETE',
        headers: {
          ...this._options.headers,
          "Authorization" : `Bearer ${token}`,
        }
      })
      .then(this._checkResponse)
  }

  addCard({ name, link }, token) {
    return fetch(`${this._options.baseUrl}/cards`,
      {
        method: 'POST',
        headers: {
          ...this._options.headers,
          "Authorization" : `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
          link: link,
        })
      })
      .then(this._checkResponse)
  }

  like(cardId, token) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`,
      {
        method: 'PUT',
        headers: {
          ...this._options.headers,
          "Authorization" : `Bearer ${token}`,
        }
      })
      .then(this._checkResponse)
  }

  dislike(cardId, token) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`,
      {
        method: 'DELETE',
        headers: {
          ...this._options.headers,
          "Authorization" : `Bearer ${token}`,
        }
      })
      .then(this._checkResponse)
  }
}

const { NODE_ENV, API_URL } = process.env;

export default new Api({
  baseUrl: NODE_ENV === 'production' ? API_URL : 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
})