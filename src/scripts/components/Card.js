class Card {
  constructor(
    { id, data, handleCardClick, handleLikeClick, handleDeleteIconClick },
    cardSelector
  ) {
    this._userId = id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const newCard = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__element")
      .cloneNode(true);

    return newCard;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._photo = this._element.querySelector(".card__photo");
    this._delBtn = this._element.querySelector(".card__del");
    this._likesCounter = this._element.querySelector(".card__like-counter");
    this._setEventListeners();

    this._photo.src = this._link;
    this._photo.alt = this._name;
    this._element.querySelector(".card__caption").textContent = this._name;
    this._likesCounter.textContent = this._likes.length;
    this._handleToggleLike();
    this._delBtn.classList.add(
      this._userId === this._ownerId ? "card__del_visible" : "card__del_hidden"
    );

    return this._element;
  }

  _setEventListeners() {
    this._likeBtn = this._element.querySelector(".card__like");

    this._photo.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );

    this._likeBtn.addEventListener("click", () => this._handleLikeClick(this));

    this._delBtn.addEventListener("click", () =>
      this._handleDeleteIconClick(this._cardId)
    );
  }

  _handleToggleLike() {
    if (this.isLiked()) {
      this._likeBtn.classList.add("card__like_active");
    } else {
      this._likeBtn.classList.remove("card__like_active");
    }

    this._likesCounter.textContent = this._likes.length;
  }

  isLiked() {
    return this._likes.some((userLike) => userLike._id === this._userId);
  }

  setUserLikesStatus(data) {
    this._likes = data.likes;
    this._handleToggleLike();
  }

  getCardId() {
    return this._cardId;
  }

  handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }
}

export default Card;
