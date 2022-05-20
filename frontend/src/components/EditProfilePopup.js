import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  const isOpen = props.isOpen;
  const onClose = props.onClose;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const currentUser = useContext(CurrentUserContext);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      info: description,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm name='profile' title='Редактировать профиль' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} buttonText='Сохранить'>
      <div className='page__popup-form-field'>
        <input type='text' name='personal-name' placeholder='Введите имя' id='name-input' className='page__popup-input page__popup-input_type_name' maxLength='40' minLength='2' required onChange={handleChangeName} value={name ? name : ''}/>
        <span className='page__popup-input-error name-input-error'></span>
      </div>
      <div className='page__popup-form-field'>
        <input type='text' name='personal-position' placeholder='Введите род деятельности' id='position-input' className='page__popup-input page__popup-input_type_position' maxLength='200' minLength='2' required onChange={handleChangeDescription} value={description ? description : ''}/>
        <span className='page__popup-input-error position-input-error' ></span>
      </div>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
