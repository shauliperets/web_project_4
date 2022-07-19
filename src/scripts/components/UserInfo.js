export class UserInfo {
  constructor({ username, userJob }) {
    this._username = username;
    this._userJob = userJob;
  }

  getUserInfo() {
    return {
      name: this._username,
      job: this._userJob,
    };
  }

  setUserInfo(name, job) {
    this._username = name;
    this._userJob = job;

    document.querySelector(".profile__title").textContent = name;
    document.querySelector(".profile__subtitle").textContent = job;
  }
}
