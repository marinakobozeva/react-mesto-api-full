import React from 'react';
import Card from '../components/Card'
import { useContext } from 'react';
import pencil from '../images/pencil.png';
import plus from '../images/plus.png';
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  const cards = props.cards;
  const onCardLike = props.onCardLike;
  const onCardDelete = props.onCardDelete;
  const onCardClick = props.onCardClick;

  return (
    <main className='main'>
    <section className='profile'>
      <div className='profile__info'>
        <button className='profile__avatar-edit-button' onClick={props.onEditAvatar}>
          <img alt='Аватар' className='profile__avatar' src={currentUser && currentUser.avatar}/>
        </button>
        <div className='profile__text'>
            <h1 className='profile__name'>{currentUser && currentUser.name}</h1>
            <button type='button' className='profile__edit-button' onClick={props.onEditProfile}>
              <img src={pencil} alt='Кнопка редактирования' className='profile__edit-image' />
            </button>
            <p className='profile__position'>{currentUser && currentUser.about}</p>
        </div>
      </div>
      <button type='button' className='profile__add-button' onClick={props.onAddPlace}>
        <img src={plus} alt='Плюс' className='profile__add-image' />
      </button>
    </section>
    <section>
      <ul className='elements'>
        {cards.map((card) => {
          return (
           <Card onCardDelete={onCardDelete} onCardLike={onCardLike} key={card._id} card={card} onCardClick={onCardClick}/>
          )
        })}
      </ul>
    </section>
  </main>
  )
}

export default Main;