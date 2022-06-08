import Popup from './Popup.js';

class PopupWithSubmit extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._form = this._popupSelector.querySelector('.popup__form');
        this._submitBtn = this._form.querySelector('.popup__save-button');
        this._handleEnterClose = this._handleEnterClose.bind(this);
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
            this._submitBtn.textContent = 'Да';
        }
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEnterClose);
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleEnterClose);
    }

    _handleEnterClose(evt) {
        super._handleEscClose(evt);
        if(evt.key === 'Enter') {
            this._submitHandler();
        }
    }

}

export default PopupWithSubmit;