import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const isOpen = props.isOpen;
  const onClose = props.onClose;

  const [place, setPlace] = useState('');
  const [placeUrl, setPlaceUrl] = useState('');

  function handleChangePlace (e) {
    setPlace(e.target.value);
  }

  function handleChangePlaceUrl (e) {
    setPlaceUrl(e.target.value);
  }


  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    props.onUpdatePlace({
      name: place,
      link: placeUrl
    });
  }

  useEffect(() => {
    setPlace('');
    setPlaceUrl('');
  }, [isOpen]);

  return (
    <PopupWithForm name='new-place' title='Новое место' isOpen={isOpen} onClose={onClose} onSubmit={handleAddPlaceSubmit} buttonText='Создать'>
      <div className='page__popup-form-field'>
        <input type='text' name='place-name' placeholder='Название' id='place-input' className='page__popup-input page__popup-input_type_place' minLength='1' maxLength='30' onChange={handleChangePlace} value={place} required />
        <span className='page__popup-input-error place-input-error'></span>
      </div>
      <div className='page__popup-form-field'>
        <input type='url' name='place-link' placeholder='Ссылка на картинку' id='link-input' className='page__popup-input page__popup-input_type_link' onChange={handleChangePlaceUrl} value={placeUrl} required />
        <span className='page__popup-input-error link-input-error'></span>
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup;