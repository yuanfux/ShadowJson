var assert = require('assert');
var ShadowJson = require('../dist/ShadowJson');

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

function test(testText, type, args, expected) {
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
          assert.deepStrictEqual(sJson.get(), expected);
        });
      });
    });
  } else if (type === 2) {
    describe('ShadowJson', function() {
      describe('#set()', function() {
        it(testText, function() {
          assert.deepStrictEqual(sJson.get(), expected);
        });
      });
    });
  } else if (type === 3) {
    describe('ShadowJson', function() {
      describe('#commit()', function() {
        it(testText, function() {
          assert.deepStrictEqual(sJson.get(), expected);
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
