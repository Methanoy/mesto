import Popup from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._zoomImage = this._popupSelector.querySelector('.popup__zoom-image');
        this._zoomTitle = this._popupSelector.querySelector('.popup__title_zoom');
    }

    open(name, link) {
        this._zoomImage.src = link;
        this._zoomImage.alt = name;
        this._zoomTitle.textContent = name;
        super.open();
    }
}

export default PopupWithImage;