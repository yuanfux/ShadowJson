var assert = require('assert');
var ShadowJson = require('../dist/ShadowJson');

function pathHelper(obj, path) {
    path = path ? path.split('.') : path;
    for (let i = 0 ; obj && i < path.length ; i++) {
      obj = obj[path[i]];
    }
    return obj;
  }

function test(testText, type, args, expected, path) {
  var testObj = {
    a: 1,
    b: '2',
    c: {
      d: 3,
      e: '4',
      f: {
        g: 5,
        h: '6'
      },
      i: {
        j: 7,
        k: ['8', 9]
      }
    }
  };
	const sJson = new ShadowJson(testObj, args);
	if (type === 0) {
		describe('ShadowJson', function() {
		  describe('#ShadowJson()', function() {
		    it(testText, function() {
	      	assert.deepStrictEqual(sJson.get(), expected);
		    });
		  });
		});
	} else if (type === 1) {
    describe('ShadowJson', function() {
      describe('#get()', function() {
        it(testText, function() {
          assert.deepStrictEqual(sJson.get(path), expected);
        });
      });
    });
  } else if (type === 2) {
    describe('ShadowJson', function() {
      describe('#set()', function() {
        it(testText, function() {
          sJson.set(path, expected)
          assert.deepStrictEqual(sJson.get(path), expected);
        });
      });
    });
  } else if (type === 3) {
    describe('ShadowJson', function() {
      describe('#commit()', function() {
        it(testText, function() {
          sJson.set(path, expected);
          sJson.commit(path);
          assert.deepStrictEqual(pathHelper(testObj, path), expected);
        });
      });
    });
  } else if (type === 4) {
    describe('ShadowJson', function() {
      describe('#discard()', function() {
        it(testText, function() {
          assert.deepStrictEqual(sJson.get(), expected);
        });
      });
    });
  }
}

function testCommit() {
  var testObj = {
    a: 1,
    b: '2',
    c: {
      d: 3,
      e: '4',
      f: {
        g: 5,
        h: '6'
      },
      i: {
        j: 7,
        k: ['8', 9]
      }
    }
  };
  describe('ShadowJson', function() {
    describe('#commit()', function() {
      const sJson = new ShadowJson(testObj, ['a']);
      // modify
      it("should return 2 when committing a path 'a' to 2", function() {
        sJson.set('a', 2);
        sJson.commit('a');
        assert.deepStrictEqual(pathHelper(testObj, 'a'), 2);
      });
      // modify deep
      it("should return {'x':{'y':1}, 'z':[5,6,7]} when committing a deep path 'c.i.k' to {'x':{'y':1}, 'z':[5,6,7]}", function() {
        sJson.set('c.i.k', {'x':{'y':1}, 'z':[5,6,7]});
        sJson.commit('c.i.k');
        assert.deepStrictEqual(pathHelper(testObj, 'c.i.k'), {'x':{'y':1}, 'z':[5,6,7]});
      });
      // delete
      it("should return undefined when committing a path 'a' to undefined", function() {
        sJson.set('a', undefined);
        sJson.commit('a');
        assert.deepStrictEqual(pathHelper(testObj, 'a'), undefined);
      });
      // delete deep
      it("should return undefined when committing a deep path 'c.i.k' to undefined", function() {
        sJson.set('c.i.k', undefined);
        sJson.commit('c.i.k');
        assert.deepStrictEqual(pathHelper(testObj, 'c.i.k'), undefined);
      });
      // modify
      it("should return {'x':{'y':1}, 'z':[5,6,7]} when committing a path 'a' to {'x':{'y':1}, 'z':[5,6,7]}", function() {
        sJson.set('a', {'x':{'y':1}, 'z':[5,6,7]});
        sJson.commit('a');
        assert.deepStrictEqual(pathHelper(testObj, 'a'), {'x':{'y':1}, 'z':[5,6,7]});
      });
      // add
      it("should return {'x':{'y':1}, 'z':[5,6,7]} when committing an non-existent path 'x.y.z' to {'x':{'y':1}, 'z':[5,6,7]}", function() {
        sJson.set('x.y.z', {'x':{'y':1}, 'z':[5,6,7]});
        sJson.commit('x.y.z');
        assert.deepStrictEqual(pathHelper(testObj, 'x.y.z'), {'x':{'y':1}, 'z':[5,6,7]});
      });
      it("should return corresponding values when committing all paths once", function() {
        sJson.set('a', 10); // modify
        sJson.set('c.f.h', {'k':10}) // modify deep
        sJson.set('z', '10') // add
        sJson.set('c.f.z', {'m':[5,6,7],'n':{'y':1}}); // add deep
        sJson.set('b', undefined) // delete
        sJson.set('c.i.k', undefined) // delete deep
        sJson.commit();
        assert.deepStrictEqual(pathHelper(testObj, 'a'), 10);
        assert.deepStrictEqual(pathHelper(testObj, 'c.f.h'), {'k':10});
        assert.deepStrictEqual(pathHelper(testObj, 'z'), '10');
        assert.deepStrictEqual(pathHelper(testObj, 'c.f.z'), {'m':[5,6,7],'n':{'y':1}});
        assert.deepStrictEqual(pathHelper(testObj, 'b'), undefined);
        assert.deepStrictEqual(pathHelper(testObj, 'c.i.k'), undefined);
      });

    });
  });
}

test("should return {} when copying undefined path",
		 0,
	   undefined,
	   {});

test("should return {a:1} when copying a path 'a'",
		 0,
	   ['a'],
	   {a:1});

test("should return {'c.f.h':'6'} when copying a deep path 'c.f.h'",
		 0,
	   ['c.f.h'],
	   {'c.f.h':'6'});

test("should return {'c.i.k':['8',9]} when copying a deep path 'c.i.k'",
		 0,
		 ['c.i.k'],
		 {'c.i.k':['8',9]});

test("should return {'c.f':{g:5,h:'6'}, 'c.i':{j:7,k:['8',9]}} when copying 2 deep paths 'c.f' and 'c.i'",
		 0,
	   ['c.f', 'c.i'],
	   {'c.f':{g:5,h:'6'}, 'c.i':{j:7,k:['8',9]}});

test("should return 1 when getting the value of a path 'a'",
     1,
     ['a'],
     1,
     'a');

test("should return ['8',9] when getting the value of a deep path 'c.i.k'",
     1,
     ['c.i.k'],
     ['8',9],
     'c.i.k');

test("should return undefined when getting an non-existent path 'a.f.g'",
     1,
     ['a'],
     undefined,
     'a.f.g');

test("should return all paths and entries",
     1,
     ['c.d', 'c.i.k'],
     {'c.d':3,'c.i.k':['8',9]});

test("should return 2 when setting an existent path 'a' to 2",
     2,
     ['a'],
     2,
     'a');

test("should return undefined when setting an existent path 'a' to undefined",
     2,
     ['a'],
     undefined,
     'a');

test("should return {'x':{'y':1}, 'z':[5,6,7]} when setting an existent path 'a' to {'x':{'y':1}, 'z':[5,6,7]}",
     2,
     ['a'],
     {'x':{'y':1}, 'z':[5,6,7]},
     'a');

test("should return 3 when setting an non-existent path 'q' to 3",
     2,
     ['a'],
     3,
     'q');

test("should return unchanged paths and entries when setting an invalid path to 1",
     2,
     ['a'],
     {a:1},
     null);

testCommit();

// describe('ShadowJson', function() {
//   describe('#_e()', function() {
//     const sJson = new ShadowJson(testObj, ['a']);
//     it('test _e() modify', function() {
//         // modify
//         sJson._e(testObj, 'a', 123);
//         console.log(testObj);
//     		assert.deepStrictEqual(testObj.a, 123);

//         // deep modify
//         sJson._e(testObj, 'c.f.g', 'ttt');
//         console.log(testObj);
//         assert.deepStrictEqual(testObj.c.f.g, 'ttt');

//         // delete
//         sJson._e(testObj, 'a');
//         console.log(testObj);
//         assert.deepStrictEqual(testObj.a, undefined);

//         // deep delete
//         sJson._e(testObj, 'c.i.k');
//         console.log(testObj);
//         assert.deepStrictEqual(testObj.c.i.k, undefined);

//         // deep delete does not exist
//         assert.deepStrictEqual(sJson._e(testObj, 'a.c'), false);
//         console.log(testObj);

//         // add
//         sJson._e(testObj, 'aa', 123);
//         assert.deepStrictEqual(testObj.aa, 123);
//         console.log(testObj);

//         // add deep
//         sJson._e(testObj, 'c.f.x.z', {'array':[1,2,3], 'string':'123', 'number':123});
//         assert.deepStrictEqual(testObj.c.f.x.z, {'array':[1,2,3], 'string':'123', 'number':123});
//         console.log(testObj);
//         // add an existing path, but not obj
//         sJson._e(testObj, 'c.e.z', {'array':[1,2,3]});
//         assert.deepStrictEqual(testObj.c.e.z, undefined);
//         console.log(testObj);
//     });
//   });
// });
