import '../../pages/index.css';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';

import { 
    initialCards, 
    validationConfig,
    nameInput, 
    occupationInput, 
    profileForm, 
    cardsForm, 
    cardsFormInputName, 
    cardsFormInputLink, 
    cardsContainer, 
    editProfileButton, 
    addCardButton 
} from '../utils/constants.js';

/*--------------------------------------Карточки "из коробки"-------------------------------------------------*/

const cardsList = new Section({
    items: initialCards,
    renderer: (cardItem) => {
        const card = new Card(cardItem, '#cards-template', handleCardClick);
        const cardElement = card.generateCard();
        cardsList.addItem(cardElement);
    }
}, cardsContainer);

cardsList.renderItems();

/*--------------------------------------Валидация форм-------------------------------------------------*/

const profileFormValidator = new FormValidator(validationConfig, profileForm);
const addCardFormValidator = new FormValidator(validationConfig, cardsForm);

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

/*--------------------------------------Данные пользователя-------------------------------------------------*/

const userInfo = new UserInfo({ 
    profileNameSelector: '.profile__name', 
    profileOccupationSelector: '.profile__occupation'
});

/*--------------------------------------Попапы-------------------------------------------------*/

//Profile:

const profileFormPopup = new PopupWithForm('.popup_profile', handleProfileFormSubmit);

profileFormPopup.setEventListeners();

function handleProfileFormSubmit(userData) {
    userInfo.setUserInfo(userData);
    profileFormPopup.close();
}

function openEditProfileForm() {
    profileFormValidator.resetForm();
    profileFormValidator.inactiveButton();
    nameInput.value = userInfo.getUserInfo().name;
    occupationInput.value = userInfo.getUserInfo().occupation;
    profileFormPopup.open();
}

editProfileButton.addEventListener('click', openEditProfileForm);

//Cards:

const addCardFormPopup = new PopupWithForm('.popup_cards', () => {

    const newCard = {}; 
    newCard.name = cardsFormInputName.value; 
    newCard.link = cardsFormInputLink.value; 

    const card = new Card(newCard, '#cards-template', handleCardClick);
    const cardElement = card.generateCard();

    cardsList.addNewItem(cardElement);

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