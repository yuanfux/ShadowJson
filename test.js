var assert = require('assert');
var ShadowJson = require('./dist/ShadowJson');

var object = {
	a: 123,
	b: 'hello',
	c: 'exe'
};

const sJson = new ShadowJson(object, ['a']);

console.log('original object and shadow object');
console.log(sJson.o);
console.log(sJson.s);

console.log('object.a = 234;');
object.a = 234;
console.log(sJson.o);
console.log(sJson.s);

console.log("sJson.s['a'] = 456;");
sJson.s['a'] = 456;
console.log(sJson.o);
console.log(sJson.s);

console.log("sJson.commit('a');");
sJson.commit('a');
console.log(object);
console.log(sJson.o);
console.log(sJson.s);

var object2 = {
	Lee: {
    name: 'Lee David',
    age: 20,
    job: 'Engineer',
    workplace: {
      name: 'Startup',
      Location: 'SF'
    }
	},
  Bill: {
    name: 'Bill Lewis',
    age: 33,
    job: 'talkshow host',
    workplace: {
      name: 'Bill Lewis Show',
      Location: 'LA'
    }
  }
}

const shadowJson = new ShadowJson(object2, ['Bill.workplace.name']);
console.log('original object and shadow object');
console.log(shadowJson.o);
console.log(shadowJson.s);

shadowJson.s['Bill.workplace.name']  = 'Lee Show';
console.log("shadowJson.s['Bill.workplace.name'] = 'Lee Show';");
console.log("shadowJson.commit('Bill.workplace.name');");
shadowJson.commit('Bill.workplace.name');
console.log(shadowJson.o);
console.log(shadowJson.s);
