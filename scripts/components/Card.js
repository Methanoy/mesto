class Card {
    constructor({ data, handleCardClick }, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
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
        this._photo = this._element.querySelector('.card__photo');
        this._setEventListeners();

        this._photo.src = this._link;
        this._photo.alt = this._name;
        this._element.querySelector('.card__caption').textContent = this._name;

        return this._element;
    }

    _setEventListeners() {
        this._photo.addEventListener('click', () => { 
            this._handleCardClick(this._name, this._link);
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