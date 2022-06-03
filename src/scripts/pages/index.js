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
    cardsForm, 
    cardContainer, 
    editProfileButton, 
    addCardButton, 
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
    headers: {
        authorization: 'a1aad93d-4f3c-4558-841a-f9fb04c02ec2',
        'Content-Type': 'application/json'
    }
});

api.getAllInitialData()
    .then(promisesArr => {
        const [ initialCards, userData ] = promisesArr;
        
        cardList.initialArray = initialCards;
        
        cardList.renderItems();

        userInfo.setUserInfo(userData);
    })
    .catch(err => console.log(`Ошибка при получении первоначальных данных с сервера: ${err}`))

/*--------------------------------------Валидация форм-------------------------------------------------*/

const profileFormValidator = new FormValidator(validationConfig, profileForm);
const addCardFormValidator = new FormValidator(validationConfig, cardsForm);

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

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
