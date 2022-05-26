//Массив предзагружаемых карточек "из коробки":
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

//Объект селекторов и классов для валидации:
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    inputErrorSelector: '.popup__input-error',
    saveButtonSelector: '.popup__save-button',
    invalidButtonClass: 'popup__save-button_invalid',
    inputErrorClass: 'popup__input_field-error',
    inputErrorActiveClass:'popup__input-error_active'
};

//Попап профиля:
const nameInput = document.querySelector('.popup__input_name');
const occupationInput = document.querySelector('.popup__input_occupation');
const profileForm = document.querySelector('.popup__profile-form');

//Попап карточек:
const cardsForm = document.querySelector('.popup__cards-form');

//Темплейт:
const cardContainer = '.cards';

//Кнопки:
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

export { 
    initialCards, 
    validationConfig,
    nameInput, 
    occupationInput, 
    profileForm,
    cardsForm, 
    cardContainer,
    editProfileButton, 
    addCardButton 
};