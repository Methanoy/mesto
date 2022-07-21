//Объект селекторов и классов для валидации:
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  inputErrorSelector: ".popup__input-error",
  saveButtonSelector: ".popup__save-button",
  invalidButtonClass: "popup__save-button_invalid",
  inputErrorClass: "popup__input_field-error",
  inputErrorActiveClass: "popup__input-error_active",
};

//Попап профиля:
const nameInput = document.querySelector(".popup__input_name");
const occupationInput = document.querySelector(".popup__input_occupation");
const profileForm = document.querySelector(".popup__profile-form");

//Попап аватара:
const avatarForm = document.querySelector(".popup__avatar-form");

//Попап карточек:
const cardsForm = document.querySelector(".popup__cards-form");

//Темплейт:
const cardContainer = ".cards";

//Кнопки:
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const editAvatarButton = document.querySelector(".profile__avatar-button");

export {
  validationConfig,
  nameInput,
  occupationInput,
  profileForm,
  avatarForm,
  cardsForm,
  cardContainer,
  editProfileButton,
  addCardButton,
  editAvatarButton,
};
