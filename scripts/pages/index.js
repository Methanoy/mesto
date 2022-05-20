import PopUpWithImage from '../components/PopUpWithImage.js';
import Popup from '../components/Popup.js';
import Section from '../components/Section.js';
import { initialCards, validationConfig } from '../utils/initial.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

//Попап профиля:
const profilePopup = document.querySelector('.popup_profile');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const nameInput = document.querySelector('.popup__input_name');
const occupationInput = document.querySelector('.popup__input_occupation');
const profileForm = document.querySelector('.popup__profile-form');

//Попап карточек:
const cardsPopup = document.querySelector('.popup_cards');
const cardsForm = document.querySelector('.popup__cards-form');
const cardsFormInputName = document.querySelector('.popup__input_cardname');
const cardsFormInputLink = document.querySelector('.popup__input_link');

//Попап изображения:
const zoomPopup = document.querySelector('.popup_zoom');

//Темплейт:
const placesContainer = document.querySelector('.cards');

//Кнопки:
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

/*--------------------------------------Добавление карточки-------------------------------------------------*/

const createCard = (data) => {
    const card = new Card({
        data: data,
        handleCardClick: (name, link) => {
            openZoomPopup.open(name, link);
        }}, '#cards-template',);
    const cardElement = card.generateCard();
    return cardElement;
};

function handleNewCardFormSubmit (event) {
    event.preventDefault();
    insertCard(createCard({
        name: cardsFormInputName.value,
        link: cardsFormInputLink.value
    }));
    cardsFormInputName.value = '';
    cardsFormInputLink.value = '';
    closePopup(cardsPopup);
}

cardsForm.addEventListener('submit', handleNewCardFormSubmit);

/*--------------------------------------Карточки "из коробки"-------------------------------------------------*/

const cardsList = new Section({
    items: initialCards,
    renderer: (cardItem) => {
        cardsList.addItem(createCard(cardItem));
        },
    }, placesContainer)

cardsList.renderItems();

/*--------------------------------------Валидация форм-------------------------------------------------*/

const profileFormValidator = new FormValidator(validationConfig, profileForm);
const addCardFormValidator = new FormValidator(validationConfig, cardsForm);

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

/*--------------------------------------Открытие попапов-------------------------------------------------*/

//Profile:
const profileFormPopup = new Popup(profilePopup);

function editProfileForm() {
    profileFormValidator.resetForm();
    nameInput.value = profileName.textContent;
    occupationInput.value = profileOccupation.textContent;
    profileFormValidator.inactiveButton();
    profileFormPopup.open();
}

editProfileButton.addEventListener('click', editProfileForm);

function handleProfileFormSubmit (event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileOccupation.textContent = occupationInput.value;
    profileFormPopup.close();
}

profileForm.addEventListener('submit', handleProfileFormSubmit);

//Cards:
const addCardFormPopup = new Popup(cardsPopup);

function openAddCardPopup() {
    addCardFormValidator.resetForm();
    addCardFormValidator.inactiveButton();
    addCardFormPopup.open();
}

addCardButton.addEventListener('click', openAddCardPopup);

//Zoom:
const openZoomPopup = new PopUpWithImage(zoomPopup);
openZoomPopup.setEventListeners();