export class UserInfo {
  constructor({ username, userJob }) {
    this._username;
    this._userJob;
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
  }
}
