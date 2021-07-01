
export class Storage {
  static storage = window.localStorage;

  static set(key, value) {
    this.storage.setItem(key, value);
  }

  static get(key, value) {
    return this.storage.getItem(key) || value;
  }

}