class FormValidator {
    constructor(validationConfig, formElement) {
        this._formSelector = validationConfig.formSelector;
        this._inputSelector = validationConfig.inputSelector;
        this._inputErrorSelector = validationConfig.inputErrorSelector;
        this._saveButtonSelector = validationConfig.saveButtonSelector;
        this._invalidButtonClass = validationConfig.invalidButtonClass;
        this._inputErrorClass = validationConfig.inputErrorClass;
        this._inputErrorActiveClass = validationConfig.inputErrorActiveClass;
        this._formElement = formElement;
    }

    enableValidation() {
        this._formElement.addEventListener('submit', evt => evt.preventDefault());
        this._setEventListeners(this._formElement);
    };

    //Добавление обработчиков инпутам:
    _setEventListeners() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const buttonElement = this._formElement.querySelector(this._saveButtonSelector);
        
        this._toggleButtonState(inputList, buttonElement);
        
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    };

    //Валидация инпута:
    _isValid(inputElement) {
        if(!inputElement.validity.valid) {
            this._showError(inputElement, inputElement.validationMessage);
        } else {
            this._hideError(inputElement);
        }
    };

    //Отображение ошибки валидации:
    _showError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.classList.add(this._inputErrorActiveClass);
        errorElement.textContent = inputElement.validationMessage;
    };

    //Скрытие ошибки валидации:
    _hideError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._inputErrorActiveClass);
        errorElement.textContent = '';
    };

    //Переключения состояния кнопки после валидации инпутов:
    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._invalidButtonClass);
            buttonElement.disabled = true;
            } else {
            buttonElement.classList.remove(this._invalidButtonClass);
            buttonElement.disabled = false;
        }
    };

    //Валидация всех инпутов:
    _hasInvalidInput(inputList) {
        return inputList.some(inputElement => {
            return !inputElement.validity.valid;
        });
    };

    //Блокиратор кнопки после изменения формы:
    inactiveButton() {
        const buttonElement = this._formElement.querySelector(this._saveButtonSelector);
        buttonElement.disabled = true;
        buttonElement.classList.add(this._invalidButtonClass);
    }

    //Очистка форм:
    resetForm() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const errorList = Array.from(this._formElement.querySelectorAll(this._inputErrorSelector));
        inputList.forEach(input => {
            input.value = '';
            input.classList.remove(this._inputErrorClass);
        });
        errorList.forEach(error => {
            error.textContent = '';
            error.classList.remove(this._inputErrorActiveClass);
        });
    }

}

export default FormValidator;
