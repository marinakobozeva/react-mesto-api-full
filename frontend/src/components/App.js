import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import InfoTooltip from './InfoTooltip';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import auth from '../utils/Auth';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';


function App() {
  const history = useHistory();

  const [isEditProfilePopupOpen, setIsProfilePopupState] = useState(false);
  const [isAddPlacePopupOpen, setIsNewPlacePopupState] = useState(false);
  const [isEditAvatarPopupOpen, setIsAvatarPopupState] = useState(false);
  const [isPhotoPopupOpen, setIsPhotoPopupState] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSelectedCard, setIsSelectedCardState] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const [status, setStatus] = useState('');
  const [isTooltipSuccess, setIsTooltipSuccess] = useState(false);

  const [userCards, setUserCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);

  const handleEditAvatarClick = () => {
    setIsAvatarPopupState(true);
  }

  const handleEditProfileClick = () => {
    setIsProfilePopupState(true);
  }

  const handleUpdateUser = ({ name, info }) => {
    const jwt = localStorage.getItem('token');
    api.changePersonalInformation({name, info}, jwt).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const handleUpdateAvatar = ({avatar}) => {
    const jwt = localStorage.getItem('token');
    api.changeAvatar(avatar, jwt).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const handleUpdatePlace = ({ name, link }) => {
    const jwt = localStorage.getItem('token');
    api.addCard({name, link}, jwt).then((card) => {
      setUserCards([card, ...userCards]);
      closeAllPopups();
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const handleAddPlaceClick = () => {
    setIsNewPlacePopupState(true)
  }

  const handleOpenPhotoPopup = () => {
    setIsPhotoPopupState(true);
  }

  const closeAllPopups = () => {
    setIsNewPlacePopupState(false);
    setIsProfilePopupState(false);
    setIsAvatarPopupState(false);
    setIsPhotoPopupState(false);
    setIsInfoTooltipOpen(false);
    setIsSelectedCardState(null);
  }

  const handleCardClick = (card) => {
    setIsSelectedCardState(card);
    handleOpenPhotoPopup();
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    const jwt = localStorage.getItem('token');
    if (isLiked) {
      api.dislike(card._id, jwt).then((newCard) => {
        const newCards = userCards.map((c) => c._id === card._id ? newCard : c);
        setUserCards(newCards);
      })
      .catch((error) => {
        console.log(error)
      })
    } else {
      api.like(card._id, jwt).then((newCard) => {
        const newCards = userCards.map((c) => c._id === card._id ? newCard : c);
        setUserCards(newCards);
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }

  function handleCardDelete(card) {
    const jwt = localStorage.getItem('token');
    api.deleteCard(card._id, jwt).then((c) => {
      const newCards = userCards.filter((c) => c._id !== card._id);
      setUserCards(newCards);
    })
    .catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      api.getInitialCards(jwt)
      .then((cards) => {
        setUserCards(cards);
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }, [loggedIn]);


  const onClose = (evt) => {
    if (evt.key === 'Escape') {
      closeAllPopups();
    } else if (evt.target.classList.contains('page__popup_opened')) {
      closeAllPopups();
    } else if (evt.target.classList.contains('page__popup-close-icon')) {
      closeAllPopups();
    }
  }

  const onInfoTooltipClose = (evt) => {
    onClose(evt);

    if (isTooltipSuccess) {
      setIsTooltipSuccess(false);
      history.push('/signin');
    }
  }

  const onRegistration = (email, password) => {
    auth.register(email, password).then((res) => {
      setIsTooltipSuccess(true);
      setStatus('Вы успешно зарегистрировались!')
      setIsInfoTooltipOpen(true);
    }).catch((message) => {
      setIsTooltipSuccess(false);
      setStatus(message);
      setIsInfoTooltipOpen(true);
    })
  }

  const onLogin = (email, password) => {
    auth.authorize(email, password).then((tokenInfo) => {
      localStorage.setItem('token', tokenInfo.token);
      return auth.userInfo(tokenInfo.token)
    })
    .then((user) => {
      setUserEmail(user.email)
      setLoggedIn(true);
      history.push('/')
    })
    .catch((message) => {
      setIsTooltipSuccess(false);
      setStatus(message)
      setIsInfoTooltipOpen(true);
    })
  }

  const onSignOut = () => {
    localStorage.removeItem('token');
    setUserEmail('');
    setLoggedIn(false);
    history.push('/signin');
  }

  useEffect(() => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      auth.userInfo(jwt).then((user) => {
        setUserEmail(user.email);
        setCurrentUser(user);
        setLoggedIn(true);
        history.push('/')
      }).catch((err) => {
        console.log(err)
        history.push('/signin')
      })
    }
  }, [loggedIn])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page__container'>
        <Header userEmail={userEmail} onSignOut={onSignOut} />
        <Switch>
          <Route path='/signup'>
            <Register onRegistration={onRegistration}/>
          </Route>
          <Route path='/signin'>
            <Login onLogin={onLogin} />
          </Route>
          <ProtectedRoute path='/' loggedIn={loggedIn}>
            <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} cards={userCards}/>
            <Footer />
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={onClose} onUpdateUser={handleUpdateUser}/>
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={onClose} onUpdateAvatar={handleUpdateAvatar}/>
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={onClose} onUpdatePlace={handleUpdatePlace}/>
            <PopupWithForm name='delete-card' title='Вы уверены?' buttonText='Да' />
            <ImagePopup card={isSelectedCard} isOpen={isPhotoPopupOpen} onClose={onClose} />
          </ProtectedRoute>
        </Switch>
        <InfoTooltip name='register' isSuccess={isTooltipSuccess} status={status} isOpen={isInfoTooltipOpen} onClose={onInfoTooltipClose}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
