import '../../pages/index.css';

import Api from '../components/Api';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';

import { 
    validationConfig,
    nameInput, 
    occupationInput, 
    profileForm, 
    avatarForm,
    cardsForm, 
    cardContainer, 
    editProfileButton, 
    addCardButton,
    editAvatarButton
} from '../utils/constants.js';

/*--------------------------------------Создание карточки-------------------------------------------------*/

const createCard = (item) => {
    const card = new Card (item, '#cards-template', handleCardClick);
    const cardElement = card.generateCard();
    return cardElement;
}

/*--------------------------------------Данные пользователя-------------------------------------------------*/

const userInfo = new UserInfo({ 
    profileNameSelector: '.profile__name', 
    profileOccupationSelector: '.profile__occupation',
    profileAvatarSelector: '.profile__avatar'
});

/*--------------------------------------Пустой массив для карточек "из коробки"-------------------------------------------------*/

const cardList = new Section({
    items: '',
    renderer: (cardItem) => {
        cardList.addItem(createCard(cardItem));
    }
}, cardContainer);

/*--------------------------------------API данные "из коробки"------------------------------------------------*/

const api = new Api({
    cardsUrl: 'https://mesto.nomoreparties.co/v1/cohort-42/cards',
    userUrl: 'https://nomoreparties.co/v1/cohort-42/users/me',
    avatarUrl: 'https://mesto.nomoreparties.co/v1/cohort-42/users/me/avatar',
    headers: {
        authorization: 'a1aad93d-4f3c-4558-841a-f9fb04c02ec2',
        'Content-Type': 'application/json'
    }
});

api.getAllInitialData()
    .then(promisesArr => {
        const [ initialCards, userData, userAvatar ] = promisesArr;
        
        cardList.initialArray = initialCards;
        
        cardList.renderItems();
        userInfo.setUserInfo(userData);
        userInfo.setUserAvatar(userAvatar);
    })
    .catch(err => console.log(`Ошибка при получении первоначальных данных с сервера: ${err}`))

/*--------------------------------------Валидация форм-------------------------------------------------*/

const profileFormValidator = new FormValidator(validationConfig, profileForm);
const addCardFormValidator = new FormValidator(validationConfig, cardsForm);
const editAvatarFormValidator = new FormValidator(validationConfig, avatarForm);

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();

/*--------------------------------------Попапы-------------------------------------------------*/

//Profile:

const profileFormPopup = new PopupWithForm('.popup_profile', handleProfileFormSubmit);

profileFormPopup.setEventListeners();

function handleProfileFormSubmit(data) {
    api.editUserInfo(data)
        .then(res => {
            userInfo.setUserInfo(res);
            profileFormPopup.close();
        })
}

function openEditProfileForm() {
    profileFormValidator.resetForm();
    profileFormValidator.inactiveButton();

    const userData = userInfo.getUserInfo();
    nameInput.value = userData.name;
    occupationInput.value = userData.about;

    profileFormPopup.open();
}

editProfileButton.addEventListener('click', openEditProfileForm);

//Avatar:

const avatarFormPopup = new PopupWithForm('.popup_avatar', (data) => {

    api.editUserAvatar(data)
        .then(res => {
            userInfo.setUserAvatar(res);
        })
    avatarFormPopup.close();
});

avatarFormPopup.setEventListeners();

function openEditAvatarForm() {
    editAvatarFormValidator.resetForm();
    editAvatarFormValidator.inactiveButton();
    avatarFormPopup.open();
}

editAvatarButton.addEventListener('click', openEditAvatarForm);

//Cards:

const addCardFormPopup = new PopupWithForm('.popup_cards', (inputValues) => {

    api.addNewCard(inputValues)
        .then(res => {
            cardList.addNewItem(createCard(res));
        })
    addCardFormPopup.close();
});

addCardFormPopup.setEventListeners();

function openAddCardFormPopup() {
    addCardFormValidator.resetForm();
    addCardFormValidator.inactiveButton();
    addCardFormPopup.open();
}

addCardButton.addEventListener('click', openAddCardFormPopup);

//Zoom:

const popupWithImage = new PopupWithImage('.popup_zoom');

function handleCardClick (name, link) {
    popupWithImage.open(name, link);
}

popupWithImage.setEventListeners();
