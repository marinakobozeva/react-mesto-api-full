import React from 'react';
import { useEffect } from 'react';
import cross from '../images/close-icon.png';
import success from '../images/success.png';
import fail from '../images/fail.png';


function InfoTooltip(props) {
  const name = props.name;
  const isSuccess = props.isSuccess;
  const isOpen = props.isOpen;
  const onClose = props.onClose;
  const status = props.status;

  useEffect(() => {
    document.addEventListener('keyup', onClose);
    return () => {
      document.removeEventListener('keyup', onClose);
    }
  }, []);

  return (
    <div className={`page__popup page__popup_type_${name} ${isOpen ? 'page__popup_opened' : ''}`} onClick={onClose}>
      <div className='page__popup-content page__popup-content_type_register'>
      <button type='button' className='page__popup-close-button'>
          <img src={cross} alt='Крестик'  className='page__popup-close-icon' />
        </button>
        <img src={isSuccess ? success : fail} alt='Статус регистрации' className='page__popup-status-image' />
        <h2 className='page__popup-title page__popup-register-title'>{status}</h2>
      </div>
    </div>
  )
}

export default InfoTooltip;