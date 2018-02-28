module.exports = class ShadowJson {
  _pv(p) {
    return !(p == null || p === '');
  }

  _dc(t) {
    return t !== undefined ? JSON.parse(JSON.stringify(t)) : undefined;
  }

	_f(obj, path) {
    path = this._pv(path) ? path.split('.') : path;
    for (let i = 0 ; obj && i < path.length ; i++) {
      obj = obj[path[i]];
    }
    return obj;
  }

  _e(obj, path, val) {
    // add path if path does not exist
    // rewrite path val if path does exist
    // delete path if path does exist and val is undefined
    if (!this._pv(path)) return false;
    path = path.split('.');
    const len = path.length;
    for (let i = 0 ; i < len ; i++) {
      if (i !== len - 1) {
        if (obj[path[i]] == null) {
          // cannot add a new path when val is undefined
          if (val === undefined) return false;
          obj[path[i]] = {};
        }
        obj = obj[path[i]];
      } else {
        if (val !== undefined) {
          obj[path[i]] = this._dc(val);
        } else {
          delete obj[path[i]];
        }
        return true;
      }
    }
  }

  constructor(obj, paths) {
		this._o = obj;
    this._s = {};
    if (paths) {
      for (let i = 0 ; i < paths.length ; i++) {
        const r = this._f(obj, paths[i]);
        if (r !== undefined) {
          this._s[paths[i]] = this._dc(r);
        }
      }
    }
	}

  get(path) {
    if (!this._pv(path)) {
      return this._s;
    }
    return this._s[path];
  }

  set(path, val) {
    if (!this._pv(path)) return;
    this._s[path] = this._dc(val);
  }

  commit(path) {
    if(this._pv(path)) {
      // commit only one path change
      if (this._s.hasOwnProperty(path)) {
        // found requested path in shadow obj
        // try to commit changes to the original data and delete key
        this._e(this._o, path, this._s[path])
        delete this._s[path];
      }
    } else {
      // commit all changes
      for (const p of Object.keys(this._s)) {
        this._e(this._o, p, this._s[p])
        delete this._s[p];
      }
    }
  }

  discard(path) {
    if (this._pv(path)) {
      // discard one path change
      if (this._s.hasOwnProperty(path)) {
        delete this._s[path];
      }
    } else {
      // discard all changes
      for (const p of Object.keys(this._s)) {
        delete this._s[p];
      }
    }
  }
}