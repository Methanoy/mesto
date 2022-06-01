class Section {
    constructor({ items, renderer }, cardListSelector) {
    this.initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(cardListSelector);
    }

    renderItems() {
        this.initialArray.forEach(item => this._renderer(item)); 
    }

    addItem(element) {
        this._container.append(element);
    }

    addNewItem(element) {
        this._container.prepend(element);
    }

}

export default Section;