# ShadowJson
> A small utility class that helps to generate Path-specific and manageable JSON object copy

## Why?
In many dev cases, we have to keep an original JSON object while having another deep copied object for editing. Simply deep copying the whole object can lead to unnecessary memory usage and hard management with the original data. Shadow Json solves these problems by following features: 
1. allow path-specific clone
2. easy commit/discard changes
4. small implementation (476B)
3. support CJS, ESM and UMD

## Install

`npm install --save ShadowJson`

## Usage

```javascript
var original = { a: 1, b: '2', c: { d: 5 } };

// create ShadowJson with initial path 'c'
var shadow = new ShadowJson(original, ['c']);

// edit the shadow copy
// modify path 'c'
shadow.set('c', {z: 7});

// delete path 'b'
shadow.set('b', undefined);

// add path 'z'
shadow.set('z', 3);

// change to path 'b' is discarded
shadow.discard('b');

// commit the rest of the changes
shadow.commit();

console.log(original); // { a: 1, b: '2', c: { z: 7 }, z: 3 }
```

## API
### ShadowJson(obj, paths)


### get(path)

### set(path, val)

### commit(path)

### discard(path)
