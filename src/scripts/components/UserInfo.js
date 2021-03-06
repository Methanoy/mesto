class UserInfo {
  constructor({
    profileNameSelector,
    profileOccupationSelector,
    profileAvatarSelector,
  }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileOccupation = document.querySelector(profileOccupationSelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    const profile = {
      name: this._profileName.textContent,
      about: this._profileOccupation.textContent,
    };

    return profile;
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileOccupation.textContent = data.about;
  }

  setUserAvatar(data) {
    this._profileAvatar.src = data.avatar;
  }
}

export default UserInfo;
