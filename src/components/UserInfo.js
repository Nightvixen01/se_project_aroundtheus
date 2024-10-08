export default class UserInfo {
  constructor({ name, job }) {
    this._profileName = document.querySelector(name);
    this._profileDescription = document.querySelector(job);
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
