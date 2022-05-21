class UserInfo {
    constructor({ profileName, profileOccupation }) {
        this._profileName = document.querySelector(profileName);
        this._profileOccupation = document.querySelector(profileOccupation);
    }

    getUserInfo() {
        const profile = {
            name: this._profileName.textContent,
            occupation: this._profileOccupation.textContent,
        }

        return profile;
    }

    /*
    setUserInfo(?) {
    }
    */
}

export default UserInfo;