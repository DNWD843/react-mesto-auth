import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteConfirmPopup from './DeleteConfirmPopup';
import Login from './Login';
import Register from './Register';
import { ROUTES_MAP } from '../utils/constants';
import ProtectedRoute from './ProtectedRoute';

/**
 * @description Классовый React-компонент<br> 
 * Главный компонент приложения<br>
 * Собирает все компоненты приложения и декларирует их отрисовку<br>
 * @returns {JSX} - JSX-разметка приложения
 * @since v.2.0.0
 */
class App extends React.Component {
  constructor(props) {
    super();

    /**
     * @description Объявление стейтов и установка их начальных значений
     * @param {Object} state - объект со стейтами
     * @param {Boolean} state.isEditProfilePopupOpen - стейт попапа редактирования профиля,
     *  управляет видимостью попапа редактирования профиля. Начальное значение false - попап скрыт
     * @param {Boolean} state.isAddPlacePopupOpen - стейт попапа добавления карточки, 
     * управляет видимостью попапа добавления карточки. Начальное значение false - попап скрыт
     * @param {Boolean} state.isEditAvatarPopupOpen - стейт попапа редактирования аватара, 
     * управляет видимостью попапа редактирования аватара. Начальное значение false - попап скрыт
     * @param {Boolean} state.isDeleteConfirmPopupOpen - стейт попапа подтверждения удаления карточки,
     * управляет видимостью попапа подтверждения удаления карточки. Начальное значение false - попап скрыт
     * @param {Boolean} state.isImagePopupOpen - стейт попапа с полноразмерным изображением,
     * управляет видимостью попапа. Начальное значение false - попап скрыт
     * @param {Object | undefined} state.selectedCard - стейт кликнутой карточки, 
     * Может иметь одно из двух значений: объект с данными карточки или undefined. 
     * Начальное значение undefined - карточка не определена
     * @param {Object} state.currentUser - стейт, сохраняет объект с данными о текущем пользователе
     * @param {Array} state.cards - стейт, содержит массив объектов с данными карточек
     * @param {Boolean} state.isNewProfileLoading - стейт загрузки новых данных профиля пользователя: 
     * true - идет загрузка, false - нет загрузки
     * @param {Boolean} state.isNewAvatarLoading - стейт загрузки нового аватара пользователя:
     * true - идет загрузка, false - нет загрузки
     * @param {Boolean} state.isNewCardLoading - стейт загрузки новой карточки: true - идет загрузка, false - нет загрузки
     * @param {Boolean} state.isDeleteProcessing - стейт процесса удаления карточки: 
     * true - идет удаление, false - удаление не производится
     * @param {Boolean} state.loggedIn - стейт статуса пользователя: залогинен (true) или нет (false)
     * @this App
     * @ignore
     */
    this.state = {
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      isDeleteConfirmPopupOpen: false,
      isImagePopupOpen: false,
      selectedCard: undefined,
      currentUser: {},
      cards: [],
      isNewProfileLoading: false,
      isNewAvatarLoading: false,
      isNewCardLoading: false,
      isDeleteProcessing: false,
      loggedIn: false,
    };
  }

  /**
   * @method  closeAllPopups
   * @description Публичный метод<br>
   * Стрелочная функция, закрывает все попапы, удаляет слушатель нажатия клавиши Esc
   * @public
   * @memberof App
   * @instance
   * @since v.2.0.0
   */
  closeAllPopups = () => {
    document.removeEventListener('keydown', this.handleEscClose);
    this.setState({
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      isDeleteConfirmPopupOpen: false,
      isImagePopupOpen: false,
      selectedCard: undefined,
    });
  }

 /**
  * @method handleEscClose
  * @description Обработчик нажатия на клавишу Escape<br>
  * Стрелочная функция, закрывает попап при нажатии клавиши Esc
  * @param {Event} evt - событие 
  * @public
  * @memberof App
  * @instance
  * @since v.2.0.0
  */
  handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.closeAllPopups();
    }
  }

  /**
   * @method handleClickOnOverlay
   * @description Обработчик клика по оверлею<br>
   * Стрелочная функция, закрывает попап при клике по оверлею
   * @param {Event} evt - событие
   * @public
   * @memberof App
   * @instance
   * @since v.2.0.0
   */
  handleClickOnOverlay = (evt) => {
   /**
     * Проверка истинности условия - клик по оверлею <br>
     * Примечание: этот метод используется как обработчик в слушателе клика на оверлее попапа<br>
     * Поэтому в данном случае условие проверяет совпадение клика именно на оверлее попапа
     * @ignore
     */
    if (evt.target === evt.currentTarget) {
      this.closeAllPopups();
    }
  }

  /**
   * @method handleCardLike
   * @description Обработчик клика по иконке "лайк"<br>
   * Стрелочная функция, принимает аргументом объект с данными карточки. 
   * Ставит или снимает "лайки", в зависимости от состояния "лайка".
   * @param {Object} card - объект с данными лайкнутой карточки 
   * @param {String} card.id - id лайкнутой карточки
   * @param {Array} card.likes - массив "лайков" лайкнутой карточки
   * @public
   * @memberof App
   * @instance
   * @since v.2.0.2
   */
  handleCardLike = (card) => {
    const isLiked = card.likes.some(likeOwner => likeOwner._id === this.state.currentUser._id);
    api.changeLikeCardStatus(card.id, !isLiked)
      .then(newCard => {
        const newCards = this.state.cards.map(cardsItem => cardsItem.id === card.id
          ? {
            id: newCard._id,
            link: newCard.link,
            title: newCard.name,
            likesQuantity: newCard.likes.length,
            owner: newCard.owner,
            likes: newCard.likes
          }
          : cardsItem);
        this.setState({ cards: newCards });
      })
      .catch(err => { console.log(err); });
  };

 /**
  * @function handleCardClick
  * @description Обработчик клика по изображению карточки<br>
  * Стрелочная функция, открывает попап с полноразмерным изображением карточки, 
  * добавляет слушатель нажатия клавиши Esc
  * @public
  * @memberof App
  * @instance
  * @since v.2.0.0
  */
  handleCardClick = (card) => {
    document.addEventListener('keydown', this.handleEscClose);
    this.setState({ selectedCard: card });
    this.setState({ isImagePopupOpen: true });
  }

  /**
   * @method handleCardDelete
   * @description Обработчик клика по иконке "удалить"<br>
   * Стрелочная функция, принимает аргументом объект с данными карточки и сохраняет его в стейт. 
   * Открывает попап подтверждения удаления карточки
   * @param {Object} card - объект с данными удаляемой карточки
   * @public
   * @memberof App
   * @instance
   * @since v.2.0.4
   */
  handleCardDelete = (card) => {
    this.setState({ isDeleteConfirmPopupOpen: true });
    this.setState({ selectedCard: card });
  };

  /**
   * @function handleDeleteConfirm
   * @description Обработчик подтверждения удаления карточки (сабмит попапа подтверждения удаления)<br>
   * Стрелочная функция, удаляет карточку.
   * @param {Event} evt - событие, принимается для отмены стандартного поведения формы при сабмите
   * @memberof App
   * @instance
   * @public
   * @since v.2.0.4
   */
  handleDeleteConfirm = (evt) => {
    evt.preventDefault();
    const card = this.state.selectedCard;
    this.setState({ isDeleteProcessing: true });

    api.deleteCard(card.id)
      .then(() => {
        const newCards = this.state.cards.filter((cardsItem) => {
          return cardsItem.id !== card.id
        });
        this.setState({ cards: newCards });
        this.closeAllPopups();
      })
      .catch(err => { console.log(err); })
      .finally(() => {
        this.setState({ isDeleteProcessing: false });
      });
  }

  /**
   * @method handleEditAvatarClick
   * @description Обработчик клика по аватару<br>
   * Стрелочная функция, открывает попап редактирования аватара, добавляет слушатель нажатия клавиши Esc
   * @public
   * @memberof App
   * @instance
   * @since v.2.0.0
   */
  handleEditAvatarClick = () => {
    document.activeElement.blur();
    document.addEventListener('keydown', this.handleEscClose);
    this.setState({ isEditAvatarPopupOpen: true });
  }

  /**
   * @function handleUpdateAvatar
   * @description Обработчик сабмита формы редактирования аватара<br>
   * Изменяет аватар пользователя.<br>
   * Стрелочная функция, принимает объект с новой ссылкой на аватар пользователя, 
   * возвращает объект с изменнуми данными пользователя
   * @param {Object} Object - объект с новой ссылкой на аватар пользователя
   * @param {String} Object.avatar - новая ссылка на аватар пользователя
   * @memberof App
   * @instance
   * @public
   * @since v.2.0.2
   */
  handleUpdateAvatar = ({ avatar }) => {
    this.setState({ isNewAvatarLoading: true });
    api.editAvatar(avatar)
      .then(res => {
        this.setState({ currentUser: res });
        this.closeAllPopups();
      })
      .catch(err => { console.log(err); })
      .finally(() => {
        this.setState({ isNewAvatarLoading: false });
      });
  }

  /**
   * @method handleEditProfileClick
   * @description Обработчик клика по кнопке "Редактировать профиль"<br>
   * Стрелочная функция, открывает попап редактирования профиля, добавляет слушатель нажатия клавиши Esc
   * @public
   * @memberof App
   * @instance
   * @since v.2.0.0
   */
  handleEditProfileClick = () => {
    document.activeElement.blur();
    document.addEventListener('keydown', this.handleEscClose);
    this.setState({ isEditProfilePopupOpen: true });
  }

  /**
   * @function handleUpdateUser
   * @description Обработчик сабмита формы редактирования профиля<br>
   * Редактирует профиль пользователя.<br>
   * Стрелочная функция, принимает объект с новыми данными профиля пользователя, 
   * возвращает объект с измененными данными профиля пользователя
   * @param {Object} Object - объект с новыми данными профиля пользователя
   * @param {String} Object.name - новое имя пользователя
   * @param {String} Object.about - новое описание пользователя
   * @memberof App
   * @instance
   * @public
   * @since v.2.0.2
   */
  handleUpdateUser = ({ name, about }) => {
    this.setState({ isNewProfileLoading: true });

    api.editProfile({ name, about })
      .then(res => {
        this.setState({ currentUser: res });
        this.closeAllPopups();
      })
      .catch(err => { console.log(err); })
      .finally(() => {
        this.setState({ isNewProfileLoading: false });
      });
  }

  /**
   * @method handleAddPlaceClick
   * @description Обработчик клика по кнопке "Добавить фото"<br>
   * Стрелочная функция, открывает попап добавления новой карточки, добавляет слушатель нажатия клавиши Esc
   * @public
   * @memberof App
   * @instance
   * @since v.2.0.0
   */
  handleAddPlaceClick = () => {
    document.activeElement.blur();
    document.addEventListener('keydown', this.handleEscClose);
    this.setState({ isAddPlacePopupOpen: true });
  }

  /**
   * @method handleAddPlaceSubmit
   * @description Обработчик сабмита формы добавления новой карточки<br>
   * Стрелочная функция, принимает аргументом объект с данными для создания карточки, 
   * возвращает карточку, полученную с сервера
   * @param {Object} Object - объект с данными для создания карточки
   * @param {String} Object.name - название карточки
   * @param {String} Object.link - ссылка на изображение карточки
   * @returns {Object} - объект с данными карточки, полученный от сервера
   * @public
   * @memberof App
   * @instance
   * @since v.2.0.2
   */
  handleAddPlaceSubmit = ({ name, link }) => {
    this.setState({ isNewCardLoading: true });

    api.addNewCard({ name, link })
      .then((newCard) => {
        const obtainedCard = {
          id: newCard._id,
          link: newCard.link,
          title: newCard.name,
          likesQuantity: newCard.likes.length,
          owner: newCard.owner,
          likes: newCard.likes
        };
        const resultCardsArr = this.state.cards.concat(obtainedCard);
        this.setState({ cards: resultCardsArr });
        this.closeAllPopups();
      })
      .catch(err => { console.log(err); })
      .finally(() => {
        this.setState({ isNewCardLoading: false });
      });
  }

  /**
   * При монтировании компонента загружаем с сервера актуальные данные профиля пользователя
   * и карточки
   * @ignore
   */
  componentDidMount() {
    Promise.all([api.loadUserData(), api.loadCards()])
      .then(([currentUserData, initialCardsData]) => {
        this.setState({ currentUser: currentUserData });
        /**
         * @description массив объектов с деструктурированными данными карточек
         * @param {Object} initialCardsData - массив объектов с данными карточек, полученный 
         * после успешного запроса на сервер
         * @constant {Object} initialCards - новый массив объектов с данными карточек
         * @property {String} initialCards.id - уникальный id карточки
         * @property {String} initialCards.link - ссылка на изображение карточки
         * @property {String} initialCards.title - название карточки
         * @property {Number} initialCards.likesQuantity - число, количество лайков у карточки
         * @property {Object} initialCards.owner - объект, данные о владельце карточки
         * @property {Array} initialCards.likes - массив, содержит id всех пользователей, лайкнувших карточку
         * @ignore
         */
        const initialCards = initialCardsData.map((initialCard) => ({
          id: initialCard._id,
          link: initialCard.link,
          title: initialCard.name,
          likesQuantity: initialCard.likes.length,
          owner: initialCard.owner,
          likes: initialCard.likes
        }));
        this.setState({ cards: initialCards });
      })
      .catch(err => { console.log(err); });
  };

  /**
   * @method render
   * @description Публичный метод<br>
   * Отрисовывает основные компоненты приложения.
   * @public
   * @instance
   * @memberof App
   * @since v.2.0.0
   * @this App
   */
  render() {
    return (
      <>
        <CurrentUserContext.Provider value={ this.state.currentUser }>
          <Header />

          <Switch>
            <ProtectedRoute
              path={ ROUTES_MAP.MAIN } exact
              loggedIn={ this.state.loggedIn }
              onEditProfile={ this.handleEditProfileClick }
              onAddPlace={ this.handleAddPlaceClick }
              onEditAvatar={ this.handleEditAvatarClick }
              onCardClick={ this.handleCardClick }
              onCardLike={ this.handleCardLike }
              onCardDelete={ this.handleCardDelete }
              cards={ this.state.cards }
              component={Main}
            />             
            
            <Route path={ROUTES_MAP.SIGNUP}>
              <Register
                isLoading={ false }
              />
            </Route>

            <Route path={ROUTES_MAP.SIGNIN}>
              <Login
                isLoading={ false }
              />
            </Route>

            <Route path={ ROUTES_MAP.MAIN }>
              { !this.state.loggedIn && <Redirect to="/sign-in" /> }
            </Route>

          </Switch>

          <Footer />

          <EditProfilePopup
            isOpen={ this.state.isEditProfilePopupOpen }
            onClose={ this.closeAllPopups }
            onOverlayClick={ this.handleClickOnOverlay }
            onUpdateUser={ this.handleUpdateUser }
            isLoading={ this.state.isNewProfileLoading }
          />

          <EditAvatarPopup
            isOpen={ this.state.isEditAvatarPopupOpen }
            onClose={ this.closeAllPopups }
            onOverlayClick={ this.handleClickOnOverlay }
            onUpdateAvatar={ this.handleUpdateAvatar }
            isLoading={ this.state.isNewAvatarLoading }
          />

          <AddPlacePopup
            isOpen={ this.state.isAddPlacePopupOpen }
            onClose={ this.closeAllPopups }
            onOverlayClick={ this.handleClickOnOverlay }
            onSubmit={ this.handleAddPlaceSubmit }
            isLoading={ this.state.isNewCardLoading }
          />

          <DeleteConfirmPopup
            isOpen={ this.state.isDeleteConfirmPopupOpen }
            onClose={ this.closeAllPopups }
            onOverlayClick={ this.handleClickOnOverlay }
            onSubmit={ this.handleDeleteConfirm }
            isProcessing={ this.state.isDeleteProcessing }
          />

          <ImagePopup
            card={ this.state.selectedCard }
            onClose={ this.closeAllPopups }
            onOverlayClick={ this.handleClickOnOverlay }
            isOpen={ this.state.isImagePopupOpen }
          />

        </CurrentUserContext.Provider>
      </>
    );
  }
}

export default App;
