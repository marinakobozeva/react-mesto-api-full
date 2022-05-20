import React from 'react';
import { useEffect } from 'react';
import cross from '../images/close-icon.png';

function ImagePopup(props) {
  const card = props.card;
  const onClose = props.onClose;
  const isOpen = props.isOpen;

  useEffect(() => {
    document.addEventListener('keyup', onClose);
    return () => {
      document.removeEventListener('keyup', onClose);
    }
  }, []);

  return (
    <div className={`page__popup page__popup_type_photo ${isOpen ? 'page__popup_opened' : ''}`} onClick={onClose}>
      <div className='page__popup-photo-content'>
        <button type='button' className='page__popup-close-button'>
          <img src={cross} alt='Крестик' className='page__popup-close-icon' />
        </button>
        <img src={card && card.link} alt={card && card.name} className='page__popup-image' />
        <p className='page__popup-caption'>{card && card.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup;