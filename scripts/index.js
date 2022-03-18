/* открываем и закрываем поп-ап по нажатию на кнопки страницы */
let popupElement = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = popupElement.querySelector('.popup__close-button');

function openPopup() {
    popupElement.classList.add('popup_opened');
/* добавляем обработчик события для закрытия поп-апа по esc */
    document.addEventListener('keyup', onDocumentKeyUp);
};

function closePopup() {
    popupElement.classList.remove('popup_opened');
/* удаляем обработчик события */
    document.removeEventListener('keyup', onDocumentKeyUp);
};

function onDocumentKeyUp(event) {
    console.log(event.key)
    if(event.code === 'Escape') {
        closePopup();
    }
};

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

/* переносим данные из профиля в поля формы поп-апа */
let formElement = document.querySelector('.popup__form');
let profileName = document.querySelector('.profile__name');
let profileOccupation = document.querySelector('.profile__occupation');
let nameInput = document.querySelector('.popup__input-name');
let occupationInput = document.querySelector('.popup__input-occupation');

nameInput.value = profileName.textContent;
occupationInput.value = profileOccupation.textContent;

/* сохраняем в профиль отредактированные данные в полях формы поп-апа */
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileOccupation.textContent = occupationInput.value;
closePopup();
};

formElement.addEventListener('submit', formSubmitHandler); 