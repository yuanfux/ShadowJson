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
	      	assert.deepStrictEqual(sJson.s, expected);
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

test("should return ['8',9] when copying a deep path 'c.i.k'",
		 0,
		 ['c.i.k'],
		 {'c.i.k':['8',9]});

test("should return {'c.f':{g:5,h:'6'}, 'c.i':{j:7,k:['8',9]}} when copying 2 deep paths 'c.f' and 'c.i'",
		 0,
	   ['c.f', 'c.i'],
	   {'c.f':{g:5,h:'6'}, 'c.i':{j:7,k:['8',9]}});

// const sJson3 = new ShadowJson(testObj, ['c.f', 'c.i']);
// describe('ShadowJson', function() {
//   describe('#ShadowJson()', function() {
//     it("should return {'c.f':{g:5,h:'6'}, 'c.i':{j:7,k:'8'}} when copying 2 deep paths 'c.f' and 'c.i'", function() {
//       assert.deepStrictEqual(sJson3.s, {'c.f':{g:5,h:'6'}, 'c.i':{j:7,k:'8'}});
//     });
//   });
// });
//
// const sJson4 = new ShadowJson(testObj,);
// describe('ShadowJson', function() {
//   describe('#ShadowJson()', function() {
//     it("should return {'c.f':{g:5,h:'6'}, 'c.i':{j:7,k:'8'}} when copying 2 deep paths 'c.f' and 'c.i'", function() {
//       assert.deepStrictEqual(sJson3.s, {'c.f':{g:5,h:'6'}, 'c.i':{j:7,k:'8'}});
//     });
//   });
// });



// describe('ShadowJson', function() {
//   describe('#Access Shadow Json', function() {
//     it('should return 1', function() {
//       assert.equal(object, -1);
//     });
//   });
// });

// console.log('original object and shadow object');
// console.log(sJson.o);
// console.log(sJson.s);
//
// console.log('object.a = 234;');
// object.a = 234;
// console.log(sJson.o);
// console.log(sJson.s);
//
// console.log("sJson.s['a'] = 456;");
// sJson.s['a'] = 456;
// console.log(sJson.o);
// console.log(sJson.s);
//
// console.log("sJson.commit('a');");
// sJson.commit('a');
// console.log(object);
// console.log(sJson.o);
// console.log(sJson.s);
//
// var object2 = {
// 	Lee: {
//     name: 'Lee David',
//     age: 20,
//     job: 'Engineer',
//     workplace: {
//       name: 'Startup',
//       Location: 'SF'
//     }
// 	},
//   Bill: {
//     name: 'Bill Lewis',
//     age: 33,
//     job: 'talkshow host',
//     workplace: {
//       name: 'Bill Lewis Show',
//       Location: 'LA'
//     }
//   }
// }
//
// const shadowJson = new ShadowJson(object2, ['Bill.workplace.name']);
// console.log('original object and shadow object');
// console.log(shadowJson.o);
// console.log(shadowJson.s);
//
// shadowJson.s['Bill.workplace.name']  = 'Lee Show';
// console.log("shadowJson.s['Bill.workplace.name'] = 'Lee Show';");
// console.log("shadowJson.commit('Bill.workplace.name');");
// shadowJson.commit('Bill.workplace.name');
// console.log(shadowJson.o);
// console.log(shadowJson.s);
