# ShadowJson [![Build Status](https://travis-ci.org/yuanfux/ShadowJson.svg?branch=master)](https://travis-ci.org/yuanfux/ShadowJson)
> A small utility class that helps to generate path-specific and manageable JSON object copy

## Why?
In many dev cases, we have to keep an original JSON object while having another deep copied object for editing. Simply deep copying the whole object can lead to unnecessary memory usage and hard management with the original data. ShadowJson solves these problems by following features: 
1. allow path-specific clone
2. easy commit/discard changes
4. small implementation (476 bytes)
3. support CJS, ESM and UMD

## Install

`npm install --save ShadowJson`

## Usage

```javascript
var source = { a: 1, b: '2', c: { d: 5 } };

// create ShadowJson with initial path 'c'
var shadow = new ShadowJson(source, ['c']);

// edit the shadow copy
// modify path 'c.d'
shadow.set('c.d', {x: 7});

// delete path 'b'
shadow.set('b', undefined);

// add path 'z'
shadow.set('z', 3);

// change to path 'b' is discarded
shadow.discard('b');

// commit the rest of the changes
shadow.commit();

console.log(original); // { a: 1, b: '2', c: { d: { x: 7 } }, z: 3 }
```

## API
### ShadowJson(obj, paths)
#### The ShadowJson constructor. _Returns `Object`_.

Name | Type | Description
--- | --- | ---
`obj` | `Object` | **Required**.The JSON Object used as the source data.
`paths` | `Array<String>` | The paths need to be copied.

> **Note**: Avoid using `'.'` or `''` as object keys in the source data.

### get(path)
#### Get the value of a copied path. _Returns `Any`_.

Name | Type | Description
--- | --- | ---
`path` | `String` | return an `Object` of all copied path and value pairs if this param is not provided.

### set(path, val)
#### Set the value of a path. _Returns `void`_.

Name | Type | Description
--- | --- | ---
`path` | `String` | **Required**.The path to be set.
`val` | `Any` | The path will be set to `undefined` if this param is not provided.

### commit(path)
#### Commit the changes to the source data. _Returns `void`_.

Name | Type | Description
--- | --- | ---
`path` | `String` | Commit all changes if this param is not provided.

> **Note**: If changes are made to a path and its subpath, the most recent path change will override.

### discard(path)
#### Discard changes made to ShadowObject. _Returns `void`_.

Name | Type | Description
--- | --- | ---
`path` | `String` | Discard all changes if this param is not provided.

## License
MIT