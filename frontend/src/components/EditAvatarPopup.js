import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const isOpen = props.isOpen;
  const onClose = props.onClose;
  const onUpdateAvatar = props.onUpdateAvatar;
  const avatarRef = useRef('');

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);


  return (
    <PopupWithForm name='avatar' title='Обновить аватар' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} buttonText='Сохранить'>
      <div className='page__popup-form-field'>
        <input ref={avatarRef} type='url' name='avatar-link' placeholder='Ссылка на аватар' id='avatar-link-input' className='page__popup-input page__popup-input_type_link' required />
        <span className='page__popup-input-error avatar-link-input-error'></span>
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;