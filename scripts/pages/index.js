import Popup from '../components/Popup.js';
import Section from '../components/Section.js';
import { initialCards, validationConfig } from '../utils/initial.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

//Общий класс попапов:
const popups = document.querySelectorAll('.popup');

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

//Попап зума:
const zoomPopup = document.querySelector('.popup_zoom');
const zoomImage = document.querySelector('.popup__zoom-image');
const zoomTitle = document.querySelector('.popup__title_zoom');

//Темплейт:
const placesContainer = document.querySelector('.cards');

//Кнопки:
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

/*--------------------------------------Карточки "из коробки"-------------------------------------------------*/

const cardsList = new Section({
    items: initialCards,
    renderer: (cardItem) => {
        const card = new Card(cardItem, '#cards-template', openZoomPopup);
        const cardElement = card.generateCard();
        cardsList.addItem(cardElement);
    }
}, placesContainer);

cardsList.renderItems();

/*--------------------------------------Добавление карточки-------------------------------------------------*/

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

/*--------------------------------------Валидация форм-------------------------------------------------*/

const profileFormValidator = new FormValidator(validationConfig, profileForm);
const addCardFormValidator = new FormValidator(validationConfig, cardsForm);

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

/*--------------------------------------Открытие попапов-------------------------------------------------*/
/*
function openPopup(element) {
    element.classList.add('popup_opened');
    document.addEventListener('keyup', handleEscKey);
}
*/
//Profile:
const profileFormPopup = new Popup(profilePopup);

function editProfileForm() {
    profileFormValidator.resetForm();
    nameInput.value = profileName.textContent;
    occupationInput.value = profileOccupation.textContent;
    profileFormValidator.inactiveButton();
    //openPopup(profilePopup);
    profileFormPopup.open();
}

editProfileButton.addEventListener('click', editProfileForm);

function handleProfileFormSubmit (event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileOccupation.textContent = occupationInput.value;
    closePopup(profilePopup);
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
function openZoomPopup(name, link) {
    zoomImage.src = link;
    zoomImage.alt = name;
    zoomTitle.textContent = name;
    openPopup(zoomPopup);
}

/*--------------------------------------Закрытие попапов-------------------------------------------------*/
/*
function closePopup(element) {
    element.classList.remove('popup_opened');
    document.removeEventListener('keyup', handleEscKey);
}

//Закрытие попапа при нажатии ESC:
function handleEscKey(evt) {
    if(evt.code === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

//Закрытие попапов при нажатии на overlay и кнопки закрытия:
popups.forEach((popup) => { 
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup);
        }
        if (evt.target.classList.contains('popup__close-button')) {
            closePopup(popup);
        }
    });
});
*/