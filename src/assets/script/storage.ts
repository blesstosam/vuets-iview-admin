const api = {
  set(key: string, value: object | string, storage: Storage) {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
      value = 'obj-' + value;
    }
    storage.setItem(key, value as string);
  },

  get(key: string, storage: Storage) {
    let v = storage.getItem(key);
    if (!v) {
      return;
    }
    if (v.indexOf('obj-') === 0) {
      v = v.slice(4);
      return JSON.parse(v);
    }
    return v;
  },

  remove(key: string, storage: Storage) {
    storage.removeItem(key);
  }
};

const store = {
  storage: window.localStorage,
  set(key: string, value: object | string) {
    return api.set(key, value, this.storage);
  },
  get(key: string) {
    return api.get(key, this.storage);
  },
  remove(key: string) {
    return api.remove(key, this.storage);
  },
  session: {
    storage: window.sessionStorage,
    set(key: string, value: object | string) {
      return api.set(key, value, this.storage);
    },
    get(key: string) {
      return api.get(key, this.storage);
    },
    remove(key: string) {
      return api.remove(key, this.storage);
    }
  }
};

export default store;
