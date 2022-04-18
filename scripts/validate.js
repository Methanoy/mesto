/*--------------------------------------Валидация форм-------------------------------------------------*/

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    saveButtonSelector: '.popup__save-button',
    invalidButtonClass: 'popup__save-button_invalid',
    inputErrorClass: 'popup__input_field-error',
    inputErrorActiveClass:'popup__input-error_active'
};

const enableValidation = ({formSelector, ...rest}) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', evt => evt.preventDefault());
        setEventListeners(formElement, rest);
    });
};

const setEventListeners = (formElement, {inputSelector, saveButtonSelector, ...rest}) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(saveButtonSelector);
    toggleButtonState(inputList, buttonElement, rest);
    inputList.forEach ((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, rest);
            toggleButtonState(inputList, buttonElement, rest);
        });
    });
};

const toggleButtonState = (inputList, buttonElement, {invalidButtonClass}) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(invalidButtonClass);
    } else {
        buttonElement.classList.remove(invalidButtonClass);
    }
};


const inactiveButton = (popup) => {
    const button = popup.querySelector(validationConfig.saveButtonSelector);
    button.disabled = true;
    button.classList.add(validationConfig.invalidButtonClass);
}

const resetForm = (popup) => {
    const inputList = Array.from(popup.querySelectorAll(validationConfig.inputSelector));
    const errorList = Array.from(popup.querySelectorAll(validationConfig.inputErrorClass));
    errorList.forEach(item => {
        item.textContent = '';
        item.classList.remove(validationConfig.inputErrorActiveClass);
    });
    inputList.forEach(item => {
        item.value = '';
        item.classList.remove(validationConfig.inputErrorClass);
    });
}

//Показываем ошибку валидации:
const showError = (formElement, inputElement, errorMessage, {inputErrorClass, inputErrorActiveClass}) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(inputErrorActiveClass);
};

//Прячем ошибку валидации:
const hideError = (formElement, inputElement, {inputErrorClass, inputErrorActiveClass}) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(inputErrorActiveClass);
    errorElement.textContent = '';
};

//Проверка валидации инпутов:
const isValid = (formElement, inputElement, {inputErrorClass, inputErrorActiveClass}) => {
    if(!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage, {inputErrorClass, inputErrorActiveClass});
    } else {
        hideError(formElement, inputElement, {inputErrorClass, inputErrorActiveClass});
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

enableValidation(validationConfig);