import Popup from "./Popup.js";

class PopupWithForm extends Popup {
    constructor(popupSelector, handleProfileFormSubmit) {
        super(popupSelector)
        this._handleFormSubmit = handleProfileFormSubmit;
        this._form = this._popupSelector.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._submitBtn = this._form.querySelector('.popup__save-button');
    }

    _getInputValues() {
        this._inputValues = {};

        this._inputList.forEach(input => {
            this._inputValues[input.name] = input.value;
        });

        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._form.reset();
    }

    loading(flag) {
        if(flag) {
            this._submitBtn.textContent = 'Сохранение...';
        } else {
            this._submitBtn.textContent = 'Сохранить';
        }
    }
}

export default PopupWithForm;