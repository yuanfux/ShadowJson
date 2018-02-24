module.exports = class ShadowJson {

  _dc(t) {
    return t ? JSON.parse(JSON.stringify(t)) : undefined;
  }

	_f(obj, path) {
    path = path ? path.split('.') : path;
    for (let i = 0 ; obj && i < path.length ; i++) {
      obj = obj[path[i]];
    }
    return obj;
  }

  _rw(obj, path, val) {
    // rewrite only if the value exists
    path = path.split('.');
    const len = path.length;
    for (let i = 0 ; obj && i < len ; i++) {
      if (i !== len - 1) {
        obj = obj[path[i]];
      } else {
        if (obj[path[i]] !== undefined) {
          obj[path[i]] = this._dc(val);
          return val;
        }
      }
    }
    return undefined;
  }

  constructor(obj, paths) {
		this.o = obj;
    this.s = {};
    if (paths) {
      for (let i = 0 ; i < paths.length ; i++) {
        const r = this._f(obj, paths[i]);
        if (r !== undefined) {
          this.s[paths[i]] = this._dc(r);
        }
      }
    }
	}

  get(path) {
    return this._f(this.o, path);
  }

  sget(path) {
    return path ? this.s[path] : this.s;
  }

  commit(path) {
    if(path) {
      // commit only one change
      let rs = this.s[path];
      if (rs !== undefined) {
        if(this._rw(this.o, path, rs) !== undefined) {
          delete this.s[path];
        }
      }
    }
  }
}