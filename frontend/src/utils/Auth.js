class Auth {
  constructor(options) {
    this._options = options;
  }

  register(email, password) {
    return fetch(`${this._options.baseUrl}/signup`,
    {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({
        password: password,
        email: email,
      })
    }).then((res) => {
      if (res.ok) {
        return res.json()
      } else if (res.status === 400) {
        return Promise.reject('Некорректно заполнено одно из полей')
      } else {
        Promise.reject(`Unexpected error code: ${res.status}`)
      }
    })
  }

  authorize(email, password) {
    return fetch(`${this._options.baseUrl}/signin`,
    {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({
        password: password,
        email: email,
      })
    }).then((res) => {
      if (res.ok) {
        return res.json()
      } else if (res.status === 400) {
        return Promise.reject('Не передано одно из полей')
      } else if (res.status === 401) {
        return Promise.reject('Пользователь с таким email не найден')
      } else {
        Promise.reject(`Unexpected error code: ${res.status}`)
      }
    })
  }

  userInfo(token) {
    return fetch(`${this._options.baseUrl}/users/me`,
    {
      method: 'GET',
      headers: {
        ...this._options.headers,
        "Authorization" : `Bearer ${token}`
      }
    }).then((res) => {
      if (res.ok) {
        return res.json()
      } else if (res.status === 400) {
        return Promise.reject('Токен не передан или передан не в том формате')
      } else if (res.status === 401) {
        return Promise.reject('Переданный токен некорректен')
      } else {
        Promise.reject(`Unexpected error code: ${res.status}`)
      }
    })
  }
}

export default new Auth({
  baseUrl: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json'
  }
})