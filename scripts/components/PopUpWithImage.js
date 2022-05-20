import Popup from '../components/Popup.js';

class PopUpWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._zoomImage = document.querySelector('.popup__zoom-image');
        this._zoomTitle = document.querySelector('.popup__title_zoom');
    }

    open(name, link) {
        this._zoomImage.src = link;
        this._zoomImage.alt = name;
        this._zoomTitle.textContent = name;
        super.open();
    }
}

export default PopUpWithImage;