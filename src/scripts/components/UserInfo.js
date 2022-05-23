class UserInfo {
    constructor({ profileNameSelector, profileOccupationSelector }) {
        this._profileName = document.querySelector(profileNameSelector);
        this._profileOccupation = document.querySelector(profileOccupationSelector);
    }

    getUserInfo() {
        const profile = {
            name: this._profileName.textContent,
            occupation: this._profileOccupation.textContent
        }

        return profile;
    }

    setUserInfo(data) {
        this._profileName.textContent = data.name;
        this._profileOccupation.textContent = data.occupation;
    }
}

export default UserInfo;