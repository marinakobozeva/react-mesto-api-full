import React from 'react';
import { useState } from 'react';
import { withRouter } from 'react-router-dom';


function Login(props) {
  const onLogin = props.onLogin;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(email, password)
  }

  return (
    <div className='login'>
      <h1 className='login__title'>
        Вход
      </h1>
      <form className='login__form' onSubmit={handleSubmit}>
        <div className='login__form-field'>
          <input type='email' name='email' placeholder='Email' className='login__input login__input_type_email' maxLength='40' minLength='2' onChange={handleEmailChange} value={email} required/>
          <input type='password' name='password' placeholder='Пароль'  className='login__input login__input_type_password' maxLength='40' onChange={handlePasswordChange} value={password} minLength='2' required/>
        </div>
        <button type='submit' className='login__button'>
          Войти
        </button>
      </form>
    </div>
  )
}


export default withRouter(Login);
