import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';


function Register(props) {
  const onRegistration = props.onRegistration;
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onRegistration(email, password);

  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <div className='register'>
      <h1 className='register__title'>
        Регистрация
      </h1>
      <form className='register__form' onSubmit={handleSubmit}>
        <div className='register__form-field'>
          <input type='email' name='email' placeholder='Email' className='register__input register__input_type_email' maxLength='40' minLength='2' onChange={handleEmailChange} value={email} required/>
          <input type='password' name='password' placeholder='Пароль'  className='register__input register__input_type_password' maxLength='40' minLength='2' onChange={handlePasswordChange} value={password} required/>
        </div>
        <button type='submit' className='register__button'>
          Зарегистрироваться
        </button>
      </form>
      <div className='register__signin'>
        <p className='register__signin-text'>Уже зарегистрированы?</p>
        <Link to='login' className='register__signin-link'>Войти</Link>
      </div>

    </div>
  )
}

export default withRouter(Register);