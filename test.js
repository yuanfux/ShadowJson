var assert = require('assert');
var ShadowJson = require('./dist/ShadowJson');


assert.ok(true);
console.log(ShadowJson);
var object = {
	a: 123,
	b: 'hello',
	c: 'exe'
};

const sJson = new ShadowJson(object, ['a']);

console.log(sJson.o);
console.log(sJson.s);

object.a = 234;
console.log(sJson.o);
console.log(sJson.s);

let shadow_a = sJson.sget('a');
sJson.s['a'] = 456;
console.log(sJson.o);
console.log(sJson.s);

sJson.commit();
console.log(sJson.o);
console.log(sJson.s);

console.log(sJson.sget('a'));
console.log(sJson.sget('b'));
console.log(sJson.sget('c'));