import Popup from './Popup.js';

class PopupWithSubmit extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._form = this._popupSelector.querySelector('.popup__form');
        this._submitBtn = this._form.querySelector('.popup__save-button');
    }

    handleSubmit(callback) {
        this._submitHandler = callback;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', evt => {
            evt.preventDefault();
            this._submitHandler();
        })
    }

    loading(flag) {
        if(flag) {
            this._submitBtn.textContent = 'Сохранение...';
        } else {
            this._submitBtn.textContent = 'Удалено';
        }
    }
}

export default PopupWithSubmit;