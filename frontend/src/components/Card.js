import React from 'react';
import trash from '../images/trash.png';
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card(props) {
  const currentUser = useContext(CurrentUserContext)
  const card = props.card;

  const isOwn = card && card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = isOwn ? 'element__delete-button' : 'element__delete-button_hidden';
  const isLiked = card && card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = isLiked ? 'element__like-button element__like-button_active' : 'element__like-button';
  const onCardLike = props.onCardLike;
  const onCardDelete = props.onCardDelete;

  const onClick = () => {
    props.onCardClick(card);
  }

  const handleLikeClick = (event) => {
    event.stopPropagation();
    onCardLike(card);
  }

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    onCardDelete(card);
  }

  return (
    <li className='element' >
      <button type='button' className={cardDeleteButtonClassName} onClick={handleDeleteClick}>
        <img src={trash} alt='Корзина' />
      </button>
      <img src={card.link} alt={card.name} className='element__photo' onClick={onClick}/>
      <div className='element__caption'>
        <p className='element__caption-text'>{card.name}</p>
        <div className='element__like-group'>
          <button type='button' className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <p className='element__like-text'>{card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;