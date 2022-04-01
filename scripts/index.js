//Попап профиля:
const profilePopup = document.querySelector('.popup_profile');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const nameInput = document.querySelector('.popup__form-field_input-name');
const occupationInput = document.querySelector('.popup__form-field_input-occupation');
const profileForm = document.querySelector('.popup__profile-form');

//Попап карточек:
const cardsPopup = document.querySelector('.popup_cards');
const cardsForm = document.querySelector('.popup__cards-form');
const cardsFormInputName = document.querySelector('.popup__form-field_input-cardname');
const cardsFormInputLink = document.querySelector('.popup__form-field_input-link');

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
const closeEditButton = document.querySelector('.popup__close-button_edit');
const closeAddButton = document.querySelector('.popup__close-button_add');
const closeZoomButton = document.querySelector('.popup__close-button_zoom');

/*--------------------------------------Карточки "из коробки"-------------------------------------------------*/
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

function createCard(item) {
    const newCard = cardsTemplate.querySelector('.cards__element').cloneNode(true);
    newCard.querySelector('.card__photo').src = item.link;
    newCard.querySelector('.card__photo').alt = item.name;
    newCard.querySelector('.card__caption').textContent = item.name;
    newCard.querySelector('.card__photo').addEventListener('click', openZoomPopup);
    newCard.querySelector('.card__like').addEventListener('click', likeActive);
    newCard.querySelector('.card__del').addEventListener('click', removeCard);
    placesContainer.prepend(newCard);
    return newCard;
}

function showCards() {
    initialCards.forEach(item => createCard(item));
}

showCards();

/*--------------------------------------Добавление карточки-------------------------------------------------*/

function newCardFormSubmitHandler (event) {
    event.preventDefault();
    createCard({
        name: cardsFormInputName.value,
        link: cardsFormInputLink.value
    });
    placesContainer.prepend(cardsPopup);
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
}

//Profile:
function editProfileForm() {
    nameInput.value = profileName.textContent;
    occupationInput.value = profileOccupation.textContent;
    document.addEventListener('keyup', onDocumentKeyUp);
    openPopup(profilePopup);
}

editProfileButton.addEventListener('click', editProfileForm);

function formSubmitHandler (event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileOccupation.textContent = occupationInput.value;
    closePopup(profilePopup);
}

profileForm.addEventListener('submit', formSubmitHandler);

//Cards:
function openAddCardPopup() {
    document.addEventListener('keyup', onDocumentKeyUp);
    openPopup(cardsPopup);
}

addCardButton.addEventListener('click', openAddCardPopup);

//Zoom:
function openZoomPopup(event) {
    zoomImage.src = event.target.src;
    zoomImage.alt = event.target.alt;
    zoomTitle.textContent = event.target.alt;
    document.addEventListener('keyup', onDocumentKeyUp);
    openPopup(zoomPopup);
}

/*--------------------------------------Закрытие попапов-------------------------------------------------*/
function closePopup(element) {
    element.classList.remove('popup_opened');
}

//Profile:
function closeProfilePopup() {
    document.removeEventListener('keyup', onDocumentKeyUp);
    closePopup(profilePopup);
}

closeEditButton.addEventListener('click', closeProfilePopup);

//Cards:
function closeAddCardPopup() {
    document.removeEventListener('keyup', onDocumentKeyUp);
    closePopup(cardsPopup);
}

closeAddButton.addEventListener('click', closeAddCardPopup);

//Zoom:
function closeZoomPopup() {
    document.removeEventListener('keyup', onDocumentKeyUp);
    closePopup(zoomPopup);
}

closeZoomButton.addEventListener('click', closeZoomPopup);

//Закрытие попапа при нажатии ESC
function onDocumentKeyUp(event) {
    if(event.code === 'Escape') {
        closePopup(profilePopup);
        closePopup(cardsPopup);
        closePopup(zoomPopup);
    }
}
