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
const cardsTemplate = document.querySelector('#cards-template').content;
const placesContainer = document.querySelector('.cards');

//Кнопки:
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const closeButton = document.querySelectorAll('.popup__close-button');

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

/*--------------------------------------Карточки "из коробки"-------------------------------------------------*/

function createCard(item) {
    const newCard = cardsTemplate.querySelector('.cards__element').cloneNode(true);
    const cardPhoto = newCard.querySelector('.card__photo');
    cardPhoto.src = item.link;
    cardPhoto.alt = item.name;
    newCard.querySelector('.card__caption').textContent = item.name;
    cardPhoto.addEventListener('click', openZoomPopup);
    newCard.querySelector('.card__like').addEventListener('click', likeActive);
    newCard.querySelector('.card__del').addEventListener('click', removeCard);
    return newCard;
}

function insertCard(card) {
    placesContainer.prepend(card);
}

function showCards() {
    initialCards.forEach(item => insertCard(createCard(item)));
}

showCards();

/*--------------------------------------Добавление карточки-------------------------------------------------*/

function newCardFormSubmitHandler (event) {
    event.preventDefault();
    insertCard(createCard({
        name: cardsFormInputName.value,
        link: cardsFormInputLink.value
    }));
    cardsFormInputName.value = '';
    cardsFormInputLink.value = '';
    inactiveButton(cardsPopup);
    closePopup(cardsPopup);
}

cardsForm.addEventListener('submit', newCardFormSubmitHandler);

/*--------------------------------------Лайк карточки-------------------------------------------------*/
function likeActive(event) {
    event.target.classList.toggle('card__like_active');
}

/*--------------------------------------Удаление карточки-------------------------------------------------*/
function removeCard(event) {
    event.target.closest('.cards__element').remove();
}

/*--------------------------------------Открытие попапов-------------------------------------------------*/
function openPopup(element) {
    element.classList.add('popup_opened');
    document.addEventListener('keyup', onDocumentKeyUp);

}

//Profile:
function editProfileForm() {
    resetForm(profilePopup);
    nameInput.value = profileName.textContent;
    occupationInput.value = profileOccupation.textContent;
    openPopup(profilePopup);
}

editProfileButton.addEventListener('click', editProfileForm);

function formSubmitHandler (event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileOccupation.textContent = occupationInput.value;
    inactiveButton(profilePopup);
    closePopup(profilePopup);
}

profileForm.addEventListener('submit', formSubmitHandler);

//Cards:
function openAddCardPopup() {
    resetForm(cardsPopup);
    openPopup(cardsPopup);
}

addCardButton.addEventListener('click', openAddCardPopup);

//Zoom:
function openZoomPopup(event) {
    zoomImage.src = event.target.src;
    zoomImage.alt = event.target.alt;
    zoomTitle.textContent = event.target.alt;
    openPopup(zoomPopup);
}

/*--------------------------------------Закрытие попапов-------------------------------------------------*/
function closePopup(element) {
    element.classList.remove('popup_opened');
    document.removeEventListener('keyup', onDocumentKeyUp);
}

//Закрытие любого открытого попапа
closeButton.forEach(item => {
    item.addEventListener('click', evt => closePopup(evt.target.closest('.popup'))); 
});

//Закрытие попапа при нажатии ESC
function onDocumentKeyUp(evt) {
    if(evt.code === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

//Закрытие попапов при клике на overlay:
document.addEventListener('mousedown', evt => {
    if(evt.target.classList.contains('popup')) {
        closePopup(evt.target);
    }
});
