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

  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`,
      {headers: this._options.headers}
    )
      .then(this._checkResponse)
  }

  getPersonalInformation() {
    return fetch(`${this._options.baseUrl}/users/me`,
      {headers: this._options.headers}
    )
      .then(this._checkResponse)
  }

  changePersonalInformation({ name, info }) {
    return fetch(`${this._options.baseUrl}/users/me`,
      {
        method: 'PATCH',
        headers: this._options.headers,
        body: JSON.stringify({
          name: name,
          about: info,
        })
      })
      .then(this._checkResponse)
  }

  changeAvatar(avatarUrl) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`,
      {
        method: 'PATCH',
        headers: this._options.headers,
        body: JSON.stringify({
          avatar: avatarUrl,
        })
      })
      .then(this._checkResponse)
  }

  deleteCard(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}`,
      {
        method: 'DELETE',
        headers: this._options.headers,
      })
      .then(this._checkResponse)
  }

  addCard({ name, link }) {
    return fetch(`${this._options.baseUrl}/cards`,
      {
        method: 'POST',
        headers: this._options.headers,
        body: JSON.stringify({
          name: name,
          link: link,
        })
      })
      .then(this._checkResponse)
  }

  like(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`,
      {
        method: 'PUT',
        headers: this._options.headers,
      })
      .then(this._checkResponse)
  }

  dislike(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`,
      {
        method: 'DELETE',
        headers: this._options.headers,
      })
      .then(this._checkResponse)
  }
}

export default new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort35',
  headers: {
    authorization: '9b276f44-ded2-4e62-b628-d257305c5531',
    'Content-Type': 'application/json'
  }
})