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

  _e(obj, path, val) {
    // add path val if path does not exist
    // rewrite path val if path does exist
    // delete path if path does exist and val === undefined
    if (!path) return false;
    path = path.split('.');
    const len = path.length;
    for (let i = 0 ; i < len ; i++) {
      if (i !== len - 1) {
        if (obj[path[i]] == null) {
          // cannot add a new path when val === undefined
          if (val === undefined) return false;
          obj[path[i]] = {};
        }
        obj = obj[path[i]];
      } else {
        // reach here only if has path
        // if path does not exist, val cannot be undefined
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

  // get(path) {
  //   return this._f(this.o, path);
  // }

  get(path) {
    return this.s[path];
  }

  set(path, val) {
    this.s[path] = val;
  }

  // sget(path) {
  //   return path ? this.s[path] : this.s;
  // }

  commit(path) {
    if(path) {
      // commit only one path change
      let rs = this.s[path];
      if (rs !== undefined) {
        // found requested path in shadow obj
        if(this._e(this.o, path, rs) !== undefined) {
          // found the path and rewrite the path val in original obj
          delete this.s[path];
        }
      }
    }
  }

  discard(path) {
    if (path) {
      let rs = this.s[path];
      if (rs !== undefined) {
        delete this.s[path];
      }
    }
  }
}