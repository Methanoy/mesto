class Card {
    constructor(data, cardSelector, openZoomPopup) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._openZoomPopup = openZoomPopup;
    }
    
    _getTemplate() {
        const newCard = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.cards__element')
        .cloneNode(true);

        return newCard;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.card__photo').src = this._link;
        this._element.querySelector('.card__photo').alt = this._name;
        this._element.querySelector('.card__caption').textContent = this._name;

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.card__photo').addEventListener('click', () => { 
            this._openZoomPopup(this._name, this._link);
        });

        this._element.querySelector('.card__like').addEventListener('click', () => { 
            this._handleToggleLike();
        });

        this._element.querySelector('.card__del').addEventListener('click', () => { 
            this._handleDeleteCard();
        });
    }

    _handleToggleLike() {
        this._element.querySelector('.card__like').classList.toggle('card__like_active');
    }

    _handleDeleteCard() {
        this._element.remove();
        this._element = null;
    }

}

export default Card;