class SObject {
	constructor(obj) {
		this.o = obj;
    this.s = {};
	}

  _f(obj, path) {
    path = path ? path.split('.') : path;
    for (let i = 0 ; obj && i < path.length ; i++) {
      obj = obj[path[i]];
    }
    return obj;
  }

  get(path) {
    return _f(this.o, path);
  }

  sget(path) {
    return path ? this.s[path] : this.s;
  }

  commit(path) {
    if(path) {
      // commit only one change
      let t = _f(this.o)
    } else {
      // commit all changes
    }
  }
}