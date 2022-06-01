const handleResponse = (res) => {
    if(res.ok) {
        return res.json();
    }
    return Promise.reject(`Okay, Houston, we\'ve had a problem here: ${res.status}`);
}

class Api {
    constructor(options) {
        this.cardsUrl = options.cardsUrl;
        this.userUrl = options.userUrl;
        this.headers = options.headers;
    }

    _getInitialCardsData() {
        return fetch(this.cardsUrl, {
            headers: this.headers
        })
        .then(handleResponse);
    }

    _getInitialUserData() {
        return fetch(this.userUrl, {
            headers: this.headers
        })
        .then(handleResponse);
    }

    getAllInitialData() {
        return Promise.all([ this._getInitialCardsData(), this._getInitialUserData() ])
    }

    editUserProfile(data) {
        return fetch(this.userUrl, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            })
        })
        .then(handleResponse);
    }

    addNewCard(data) {
        return fetch(this.cardsUrl, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            })
        })
        .then(handleResponse);
    }

    deleteCard(data) {
        return fetch(this.cardsUrl, {
            method: 'DELETE',
            headers: this.headers,
            body: JSON.stringify(data)
        })
        .then(handleResponse);
    }

}

export default Api;