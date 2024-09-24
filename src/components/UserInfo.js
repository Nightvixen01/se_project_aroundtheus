export default class UserInfo {
  constructor({ name, job }) {
    this._profileName = document.querySelector(".profile__title");
    this._profileDescription = document.querySelector(".profile__description");
    this.setUserInfo({ title: name, description: job });
  }

  getUserInfo() {
    return {
      title: this._profileName.textContent,
      description: this._profileDescription.textContent,
    };
  }

  setUserInfo(data) {
    this._profileName.textContent = data.title;
    this._profileDescription.textContent = data.description;
  }
}
