const handleResponse = (res) => {
    if(res.ok) {
        return res.json();
    }
    return Promise.reject('Okay, Houston, we\'ve had a problem here');
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
        return fetch(this.url, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(data)
        })
        .then(handleResponse);
    }

    createNewCard(data) {
        return fetch(this.url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(data)
        })
        .then(handleResponse);
    }

    deleteCard(data) {
        return fetch(this.url, {
            method: 'DELETE',
            headers: this.headers,
            body: JSON.stringify(data)
        })
        .then(handleResponse);
    }

}

export default Api;