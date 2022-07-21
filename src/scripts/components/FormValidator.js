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
    this._buttonElement = this._formElement.querySelector(
      this._saveButtonSelector
    );
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._errorList = Array.from(
      this._formElement.querySelectorAll(this._inputErrorSelector)
    );
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => evt.preventDefault());
    this._setEventListeners(this._formElement);
  }

  //Добавление обработчиков инпутам:
  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  //Валидация инпута:
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage);
    } else {
      this._hideError(inputElement);
    }
  }

  //Отображение ошибки валидации:
  _showError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._inputErrorActiveClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  //Скрытие ошибки валидации:
  _hideError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._inputErrorActiveClass);
    errorElement.textContent = "";
  }

  //Переключения состояния кнопки после валидации инпутов:
  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this.inactiveButton();
    } else {
      this._buttonElement.classList.remove(this._invalidButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  //Валидация всех инпутов:
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //Блокиратор кнопки после изменения формы:
  inactiveButton() {
    this._buttonElement.disabled = true;
    this._buttonElement.classList.add(this._invalidButtonClass);
  }

  //Очистка форм:
  resetForm() {
    this._inputList.forEach((input) => {
      this._hideError(input);
      input.value = "";
    });
  }
}

export default FormValidator;
