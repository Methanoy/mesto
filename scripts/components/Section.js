class Section {
    constructor({ items, renderer }, cardListSelector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = cardListSelector;
    }

    renderItems() {
        this._initialArray.forEach(item => this._renderer(item)); 
    }

    addItem(element) {
        this._container.prepend(element);
    }

}

export default Section;