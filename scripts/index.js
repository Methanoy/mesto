/* открываем и закрываем поп-ап по нажатию на кнопки страницы */
let popupElement = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = popupElement.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form');
let profileName = document.querySelector('.profile__name');
let profileOccupation = document.querySelector('.profile__occupation');
let nameInput = document.querySelector('.popup__form-field_input-name');
let occupationInput = document.querySelector('.popup__form-field_input-occupation');

function openPopup() {
    popupElement.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    occupationInput.value = profileOccupation.textContent;
    document.addEventListener('keyup', onDocumentKeyUp);
};

function closePopup() {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keyup', onDocumentKeyUp);
};

function onDocumentKeyUp(event) {
    console.log(event.key)
    if(event.code === 'Escape') {
        closePopup();
    }
};

/* сохраняем в профиль отредактированные данные в полях формы поп-апа */
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileOccupation.textContent = occupationInput.value;
closePopup();
};

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler); 