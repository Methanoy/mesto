import Popup from "./Popup.js";

class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector)
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupSelector.querySelector('.popup__form');

    }

    _getInputValues() {
        this._inputList = this._form.querySelectorAll('.popup__input');
        //console.log(this._form);
        //console.log(this._inputList);

        this._inputValues = {};

        this._inputList.forEach(input => {
            this._inputValues[input.name] = input.value;
        });

        //console.log(this._inputValues);
        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners();

        //console.log(this._getInputValues());

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }

    close() {
        this._form.reset();
        super.close();
    }
}

export default PopupWithForm;