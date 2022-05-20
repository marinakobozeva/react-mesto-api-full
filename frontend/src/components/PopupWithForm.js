import React from "react";
import { useEffect } from "react";
import cross from '../images/close-icon.png';

function PopupWithForm(props) {
  const title = props.title;
  const name = props.name;
  const isOpen = props.isOpen;
  const onClose = props.onClose;
  const onSubmit = props.onSubmit;
  const buttonText = props.buttonText;

useEffect(() => {
    document.addEventListener('keyup', onClose);
    return () => {
      document.removeEventListener('keyup', onClose);
    }
  }, []);

  return (
    <div className={`page__popup page__popup_type_${name} ${isOpen ? 'page__popup_opened' : ''}`} onClick={onClose}>
      <div className='page__popup-content'>
        <button type='button' className='page__popup-close-button'>
          <img src={cross} alt='Крестик'  className='page__popup-close-icon' />
        </button>
        <h2 className='page__popup-title'>{title}</h2>
        <form onSubmit={onSubmit} name={name} className='page__popup-text' >
          {props.children}
          <button type='submit' className='page__popup-save-button'>{buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;