module.exports = class ShadowJson {

	_f(obj, path) {
    path = path ? path.split('.') : path;
    for (let i = 0 ; obj && i < path.length ; i++) {
      obj = obj[path[i]];
    }
    return obj;
  }

  _rw(obj, path, val) {
    path = path.split('.');
    const len = path.length;
    for (let i = 0 ; obj && i < len ; i++) {
      if (i !== len - 1) {
        obj = obj[path[i]];
      } else {
        if (obj[path[i]] !== undefined) {
          obj[path[i]] = val;
          return val;
        }
      }
    }
    return undefined;
  }

  constructor(obj, paths) {
		this.o = obj;
    if (paths) {
      this.s = {};
      for (let i = 0 ; i < paths.length ; i++) {
        const r = this._f(obj, paths[i]);
        if (r !== undefined) {
          this.s[paths[i]] = JSON.parse(JSON.stringify(r));
        }
      }
    } else {
      this.s = JSON.parse(JSON.stringify(obj));
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
      let ro = this._f(this.o, path);
      let rs = this.s[path];
      if (ro !== undefined && rs !== undefined) {
        ro = JSON.parse(JSON.stringify(rs));
        this.s[path] = undefined;
      }
    } else {
      // commit all changes
      for (const p of Object.keys(this.s)) {
        let ro = this._f(this.o, p);
        if (ro !== undefined) {
          ro = JSON.parse(JSON.stringify(this.s[p]));
          this.s[p] = undefined;
        }
      }
    }
  }
}