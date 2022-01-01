# @nkp/linked-list

[![npm version](https://badge.fury.io/js/%40nkp%2Flinked-list.svg)](https://www.npmjs.com/package/@nkp/linked-list)
[![deploy status](https://github.com/NickKelly1/nkp-linked-list/actions/workflows/release.yml/badge.svg)](https://github.com/NickKelly1/nkp-linked-list/actions/workflows/release.yml)
[![known vulnerabilities](https://snyk.io/test/github/NickKelly1/nkp-linked-list/badge.svg)](https://snyk.io/test/github/NickKelly1/nkp-linked-list)

Zero dependency linked list data structure.

## Table of contents

- [Installation](#installation)
  - [npm](#npm)
  - [yarn](#yarn)
  - [pnpm](#pnpm)
  - [Exports](#exports)
- [Usage](#usage)
  - [LinkedList.constructor](#linkedlistconstructor)
  - [LinkedList.from](#liinkedlistfrom)
  - [LinkedList.prototype[Symbol.iterator]](#linkedlistprototypesymboliterator)
  - [LinkedList.prototype.push](#linkedlistprototypepush)
  - [LinkedList.prototype.shift](#linkedlistprototypeshift)
  - [LinkedList.prototype.unshift](#linkedlistprototypeunshift)
  - [LinkedList.prototype.clear](#linkedlistprototypeclear)
  - [LinkedList.prototype.forEach](#linkedlistprototypeforeach)
  - [LinkedList.prototype.map](#linkedlistprototypemap)
  - [LinkedList.prototype.filter](#linkedlistprototypefilter)
  - [LinkedList.prototype.reduce](#linkedlistprototypereduce)
  - [LinkedList.prototype.values](#linkedlistprototypevalues)
  - [LinkedList.prototype.keys](#linkedlistprototypekeys)
  - [LinkedList.prototype.entries](#linkedlistprototypeentries)
  - [LinkedList.prototype.toMap](#linkedlistprototypetomap)
  - [LinkedList.prototype.toEntriesArray](#linkedlistprototypetoentriesarray)
  - [LinkedList.prototype.toKeysArray](#linkedlistprototypetokeysarray)
  - [LinkedList.prototype.toValuesArray](#linkedlistprototypetovaluesarray)
  - [LinkedList.prototype.toArray](#linkedlistprototypetoarray)
  - [LinkedList.prototype.clone](#linkedlistprototypeclone)
  - [LinkedList.prototype.reverse](#linkedlistprototypereverse)
  - [LinkedList.prototype.sort](#linkedlistprototypesort)
  - [LinkedList.prototype.some](#linkedlistprototypesome)
  - [LinkedList.prototype.every](#linkedlistprototypeevery)
- [Updating Dependencies](#updating-dependencies)
- [Publishing](#publishing)

## Installation

### npm

```sh
npm install @nkp/linked-list
```

### yarn

```sh
yarn add @nkp/linked-list
```

### pnpm

```sh
pnpm add @nkp/linked-list
```

### Exports

`@nkp/linked-list` targets CommonJS and ES modules. To utilise ES modules consider using a bundler like `webpack` or `rollup`.

## Usage

### LinkedList.constructor

Creates a new LinkedList instance.

```ts
// interface

class LinkedList<T> {
  // ...

  /**
   * Create a new LinkedList
   *
   * @param values  initial values to hydrate
   */
  constructor(values?:  LinkedList<T> | T[] | Iterable<T> | null);

  // ...
}
```

```ts
// example

import { LinkedList } from '@nkp/linked-list';

const list = new LinkedList<number>([1, 2, 3]);
```

### LinkedList.from

Creates a new LinkedList instance.

Alias for [LinkedList.constructor](linkedlistconstructor).

```ts
// interface

class LinkedList<T> {
  // ...

  /**
   * Create a new LinkedList
   *
   * @param values  initial values to hydrate
   * @returns       LinkedList instance
   */
  static from<T>(values?: LinkedList<T> | T[] | Iterable<T> | null): LinkedList<T>;

  // ...
}
```

```ts
// example

import { LinkedList } from '@nkp/linked-list';

const list = LinkedList<number>.from([1, 2, 3]);
```

### LinkedList.prototype\[Symbol.iterator\]

Creates an iterator for the items in the LinkedList.

Fulfills the [Iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) interface making the `for..of` available to LinkedList instances.

```ts
// interface

class LinkedList<T> {
  // ...

  /**
   * Create an Iterator for the LinkedList's values
   */
  [Symbol.iterator](): IterableIterator<T>;

  // ...
}
```

```ts
// example

import { LinkedList } from '@nkp/linked-list';

const list = new LinkedList(['a' 'b', 'c']);

// [Symbol.iterator]() fulfills the interface for the
// for...of syntax
for (const item of list) {
  console.log(item);
}

// 'a'
// 'b'
// 'c'
```

### LinkedList.prototype.push

Push values to the end of the LinkedList.

Similar to `Array.prototype.push` but returns the LinkedList instance.

```ts
// interface

class LinkedList<T> {
  // ...

  /**
   * Push values to the end of the LinkedList
   *
   * @param values  values to push
   * @returns       the LinkedList instance
   */
  push(...values: T[]): this;

  // ...
}
```

```ts
// example

import { LinkedList } from '@nkp/linked-list';

const list = new LinkedList(['a', 'b', 'c']);

console.log(list.size); // 3
console.log(list.head); // 'a'
console.log(list.tail); // 'c'

// ['a', 'b', 'c', 'd', 'e', 'f']
list.push('c', 'd', 'e');

console.log(list.size); // 6
console.log(list.head); // 'a'
console.log(list.tail); // 'e'
```

### LinkedList.prototype.shift

Retrieve and remove the item at the head of the LinkedList if it exists.

```ts
// interface

class LinkedList<T> {
  // ...

  /**
   * Retrieve and remove the first value from the LinkedList
   *
   * @returns   the value if it exists
   */
  shift(): undefined | T;

  // ...
}
```

```ts
// example

import { LinkedList } from '@nkp/linked-list';

const list = new LinkedList(['a' 'b', 'c']);

console.log(list.size); // 3
console.log(list.head); // 'a'

console.log(list.shift()); // 'a'

console.log(list.size); // 2
console.log(list.head); // 'b'
```

### LinkedList.prototype.unshift

Unshift values onto the start of the LinkedList.

Similar to `Array.prototype.unshift` but returns the LinkedList instance.

```ts
// interface

class LinkedList<T> {
  // ...

  /**
   * Push values onto the start of the LinkedList
   *
   * @param values  values to unshift
   * @returns       the LinkedList instance
   */
  unshift(...values: T[]): this;

  // ...
}
```

```ts
// example

import { LinkedList } from '@nkp/linked-list';

const list = new LinkedList(['a', 'b' ,'c']);

console.log(list.size); // 3
console.log(list.head); // 'a'
console.log(list.tail); // 'c'

// ['d', 'e', 'f', 'a', 'b', 'c']
list.unshift('d', 'e', 'f');

console.log(list.size); // 6
console.log(list.head); // 'd'
console.log(list.tail); // 'c'
```

### LinkedList.prototype.clear

Removes all items from the LinkedList.

```ts
// interface

class LinkedList<T> {
  // ...

  /**
   * Remove all values from the LinkedList
   */
  clear(): void;

  // ...
}
```

```ts
// example

import { LinkedList } from '@nkp/linked-list';

const list = new LinkedList(['a', 'b', 'c',]);

console.log(list.size); // 3
console.log(list.head); // 'a'
console.log(list.tail); // 'c'

list.clear();

console.log(list.size); // 0
console.log(list.head); // undefined
console.log(list.tail); // undefined
```

### LinkedList.prototype.forEach

Executes a callback function for each value in the LinkedList.

Similar to `Array.prototype.forEach`.

```ts
// interface

class LinkedList<T> {
  // ...

  /**
   * Execute a callbackfn for each value in the LinkedList
   *
   * @param callbackfn  function to fire for each value
   * @param thisArg     `this` value for callbackfn
   */
  forEach(callbackfn: (value: T, index: number, linkedList: this) => void, thisArg?: any): void;

  // ...
}
```

```ts
// example

import { LinkedList } from '@nkp/linked-list';

const list = new LinkedList(['a', 'b', 'c',]);

list.forEach((value, index) => {
  console.log(`value: ${value}, index: ${index}`);
});

// value: a, index: 0
// value: b, index: 1
// value: c, index: 2
```

### LinkedList.prototype.map

Executes a callback function for each value in the LinkedList to return a value that is used to hydrate a new LinkedList.

Similar to `Array.prototype.map`.

```ts
// interface

class LinkedList<T> {
  // ...

  /**
   * Transform the LinkedList using by calling a function on each of its values
   *
   * @param callbackfn  function to tranasform each value
   * @param thisArg     `this` value for callbackfn
   * @returns           the transformed LinkedList
   */
  map<U>(callbackfn: (value: T, index: number, linkedList: this) => U, thisArg?: any): LinkedList<U>;

  // ...
}
```

```ts
// example

import { LinkedList } from '@nkp/linked-list';

const list = new LinkedList(['a', 'b', 'c']);

// [97, 98, 99]
const transformed = list.map((str) => str.charCodeAt(0));
```

### LinkedList.prototype.filter

Executes a callback function for each value in the LinkedList to create a new LinkedList of the values whose callbacks returned truthy.

Similar to `Array.prototype.filter`.

```ts
// interface

class LinkedList<T> {
  // ...

  /**
   * Filter the LinkedList by calling a function to detemine whether each item
   * should be kept
   *
   * @param callbackfn  function to determine whether to keep each valuea
   * @param thisArg     `this` value for callbackfn
   * @returns           the filtered LinkedList
   */
  filter<S extends T>(callbackfn: (value: T, index: number, linkedList: this) => value is S, thisArg?: any): LinkedList<S>;
  filter(callbackfn: (value: T, index: number, linkedList: this) => boolean, thisArg?: any): LinkedList<T>;

  // ...
}
```

```ts
// example

import { LinkedList } from '@nkp/linked-list';

const list = new LinkedList(['a', 'b', 'c']);

// ['a', 'c']
const fitered = list.map((str) => str !== 'b');
```

### LinkedList.prototype.reduce

Executes a callback function for current accumulated value each value in the LinkedList to return a new accumulated value to be given to the next call.

Similar to `Array.prototype.reduce`.

```ts
// interface

class LinkedList<T> {
  // ...

  /**
   * Execute `callbackfn` for each item in the LinkedList and accumulate
   * each returned value to pass into the next call to `callbakcfn`
   *
   * Returns the last output produced by `callbackfn`
   *
   * @param callbackfn    function to produce the next accumulated vlaue
   * @param initialValue  initial accumulated value
   * @param thisArg       `this` value for callbackfn
   * @returns             result of executing `callbackfn` on each item in the
   *                      linkedList
   */
  reduce<U>(callbackfn: (accumulator: U, next: T, index: number, linkedList: this) => U, initialValue: U, thisArg?: any): U;

  // ...
}
```

```ts
// example

import { LinkedList } from '@nkp/linked-list';

const list = new LinkedList(['a', 'b', 'c',]);
// get the sum of the charcodes in the LinkedList
const out = llIn.reduce((sum, str) => return acc + str.charCodeAt(0), 0);
console.log(294);
```

### LinkedList.prototype.values

Create an iterator for the values in thet LinkedList.

Similar to `Array.prototype.values`.

```ts
// interface

class LinkedList<T> {
  // ...

  /**
   * Create an Iterator the LinkedList's values
   *
   * @returns   Iterator of the values in the LinkedList
   */
  values(): IterableIterator<T>;

  // ...
}
```

```ts
// example

import { LinkedList } from '@nkp/linked-list';

const list = new LinkedList(['a', 'b', 'c']);

for (const value of list.values()) {
  console.log(value);
}

// 'a'
// 'b'
// 'c'
```

### LinkedList.prototype.keys

Create an iterator for the indeces in thet LinkedList.

Similar to `Array.prototype.keys`.

```ts
// interface

class LinkedList<T> {
  // ...

  /**
   * Create an Iterator the LinkedList's indeces
   *
   * @returns   Iterator of the indeces in the LinkedList
   */
  keys(): IterableIterator<number>;

  // ...
}
```

```ts
// example

import { LinkedList } from '@nkp/linked-list';

const list = new LinkedList(['a', 'b', 'c']);

for (const value of list.keys()) {
  console.log(value);
}

// 0
// 1
// 2
```

### LinkedList.prototype.entries

Create an iterator for the index-value entries in the LinkedList.

Similar to `Array.prototype.entries`.


```ts
// interface

class LinkedList<T> {
  // ...

  /**
   * Create an Iterator for the LinkedList's index-value entries
   *
   * @returns   Iterator of the index-value entries in the LinkedList
   */
  entries(): IterableIterator<[number, T]>;

  // ...
}
```

```ts
// example

import { LinkedList } from '@nkp/linked-list';

const list = new LinkedList(['a', 'b', 'c']);

for (const value of list.entries()) {
  console.log(value);
}

// [0, 'a']
// [1, 'b']
// [2, 'c']
```

### LinkedList.prototype.toMap

Create a map from the index-value entries in the LinkedList.

```ts
// interface

class LinkedList<T> {
  // ...

  /**
   * Create a Map of the LinkedList's index-value entries
   *
   * @returns   Map of the index-value entries in the LinkedList
   */
  toMap(): Map<number, T>;

  // ...
}
```

```ts
// example

import { LinkedList } from '@nkp/linked-list';

const list = new LinkedList(['a', 'b', 'c']);

// Map {
//   0 => 'a',
//   1 => 'b',
//   2 => 'c',
// }
console.log(list.toMap());
```

### LinkedList.prototype.toEntriesArray

Create an Array from the index-value entries in the LinkedList.

```ts
// interface

class LinkedList<T> {
  // ...

  /**
   * Create an Array of the LinkedList's entries
   *
   * @returns   Array of index-value entries in the LinkedList
   */
  toEntriesArray(): [number, T][];

  // ...
}
```

```ts
// example

import { LinkedList } from '@nkp/linked-list';

const list = new LinkedList(['a', 'b', 'c']);

// [
//   [0, 'a',],
//   [1, 'b',],
//   [2, 'c',],
// }
console.log(list.toEntriesArray());
```

### LinkedList.prototype.toKeysArray

Create an Array from the indeces in the LinkedList.

```ts
// interface

class LinkedList<T> {
  // ...

  /**
   * Create an Array of the LinkedList's indeces
   *
   * @returns   Array of indeces in the LinkedList
   */
  toKeysArray(): number[];

  // ...
}
```

```ts
// example

import { LinkedList } from '@nkp/linked-list';

const list = new LinkedList(['a', 'b', 'c']);

// [0, 1, 2]
console.log(list.toKeysArray());
```

### LinkedList.prototype.toValuesArray

Create an Array from the values in the LinkedList.

Alias for [LinkedList.prototype.toArray](#linkedlistprototypetoarray).

```ts
// interface

class LinkedList<T> {
  // ...

  /**
   * Create an Array of the LinkedList's values
   *
   * Alias for {@link LinkedList.toArray}
   *
   * @returns   Array of values in the LinkedList
   */
  toValuesArray(): T[];

  // ...
}
```

```ts
// example

import { LinkedList } from '@nkp/linked-list';

const list = new LinkedList(['a', 'b', 'c']);

// ['a', 'b', 'c']
console.log(list.toValuesArray());
```

### LinkedList.prototype.toArray

Create an Array from the values in the LinkedList.

```ts
// interface

class LinkedList<T> {
  // ...

  /**
   * Create an Array of the LinkedList's values
   *
   * @returns   Array of values in the LinkedList
   */
  toArray(): T[];

  // ...
}
```

```ts
// example

import { LinkedList } from '@nkp/linked-list';

const list = new LinkedList(['a', 'b', 'c']);

// ['a', 'b', 'c']
console.log(list.toArray());
```

### LinkedList.prototype.clone

Create a shallow copy of the LinkedList.

Clones the linked list and its internal items but does not clone the values.

```ts
// interface

class LinkedList<T> {
  // ...

  /**
   * Create a shallow clone of the LinkedList
   */
  clone(): LinkedList<T>;

  // ...
}
```

```ts
// example

import { LinkedList } from '@nkp/linked-list';

const list = new LinkedList([1, 2, 3]);

const clone = list.clone();

// true
console.log(list !== clone);

// but all values are the same
const listIterator = list[Symbol.iterator]():
const cloneIterator = list[Symbol.iterator]():

// check list and clone values against each-other
const listResult = listIterator.next();
while (!listResult.done) {
  const cloneResult = cloneIterator.next();
  console.log(listResult.value === cloneResult.value);
  listResult = listIterator.next();
}

// true
// true
// true
```

### LinkedList.prototype.reverse

Create a new LinkedList with the source LinkedList's values in reverse order.

Similar to `Array.prototype.reverse` but creates a new LinkedList instead of mutating the source LinkedList.

```ts
// interface

class LinkedList<T> {
  // ...

  /**
   * Create a new LinkedList with this LinkedList's values in reverse order
   *
   * @returns           LinkedList with values reversed
   */
  reverse(): LinkedList<T>;

  // ...
}
```

```ts
// example

import { LinkedList } from '@nkp/linked-list';

const list = new LinkedList(['a', 'b', 'c']);

// LinkedList ['c', 'b', 'a' ]
const reversed = list.reverse();

// false
console.log(list === reversed);
```

### LinkedList.prototype.sort

Create a new LinkedList with the source LinkedList's values but sorted.

Similar to `Array.prototype.sort` but creates a new LinkedList instead of mutating the source LinkedList.

Like `Array.prototype.sort`, by default coerces values to strings and sorts by char codes.

```ts
// interface

class LinkedList<T> {
  // ...

  /**
   * Create a new LinkedList with this LinkedList's values sorted
   *
   * @param compareFn   returns sorting precedence of items
   * @returns           LinkedList with values sorted
   */
  sort(compareFn?: (a: T, b: T) => number): LinkedList<T> {

  // ...
}
```

```ts
// example

import { LinkedList } from '@nkp/linked-list';

const alphaList = new LinkedList(['c', 'a', 'b']);

// LinkedList ['a', 'b', 'c' ]
const alphaSorted = alphaList.sort();

const numericList = new LinkedList([3, 1, 2]);

// LinkedList [1, 2, 3]
const numericSortedAsc = numericList.sort((a, b) => a - b);

// LinkedList [3, 2, 1]
const numericSortedDesc = numericList.sort((a, b) => b - a);
```

### LinkedList.prototype.some

Determine whether a predicate returns truthy for any value in the LinkedList.

Similar to `Array.prototype.some`.

Exits early if a truthy value is found.

```ts
// interface

class LinkedList<T> {
  // ...

  /**
   * Returns true if the predicate function returns true for any item in the
   * LinkedList
   *
   * Otherwise returns false
   *
   * @param predicate   boolean function to test against values
   * @param thisArg     `this` value for `predicate`
   * @returns           does the predicate return true for any item in the
   *                    LinkedList?
   */
  some(predicate: (value: T, index: number, list: LinkedList<T>) => boolean, thisArg?: any): boolean;

  // ...
}
```

```ts
// example

import { LinkedList } from '@nkp/linked-list';

const list = new LinkedList(['a', 'b' ,'c']);

// true
console.log(list.some((value) => value === 'b'));

// false
console.log(list.some((value) => value === 'B'));
```

### LinkedList.prototype.every

Determine whether a predicate returns truthy for every value in the LinkedList.

Similar to `Array.prototype.every`.

Exits early if a falsy value is found.

```ts
// interface

class LinkedList<T> {
  // ...

  /**
   * Returns true if the predicate function returns true for every item in the
   * LinkedList
   *
   * Otherwise returns false
   *
   * @param predicate   boolean function to test against values
   * @param thisArg     `this` value for `predicate`
   * @returns           does the predicate return true for every item in the
   *                    LinkedList?
   */
  every<U extends T>(predicate: (value: T, index: number, list: LinkedList<T>) => value is U, thisArg?: any): this is LinkedList<U>;
  every(predicate: (value: T, index: number, list: LinkedList<T>) => boolean, thisArg?: any): boolean;

  // ...
}
```

```ts
// example

import { LinkedList } from '@nkp/linked-list';

const list = new LinkedList(['a', 'b' ,'c']);

// false
console.log(list.every((value) => value === 'b'));

// true
console.log(list.every((value) => typeof value === 'string'));
```


## Updating dependencies

To update dependencies run one of

```sh
# if npm
# update package.json
npx npm-check-updates -u
# install
npm install

# if yarn
# update package.json
yarn create npm-check-updates -u
# install
yarn

# if pnpm
# update package.json
pnpx npm-check-updates -u
# install
pnpm install
```

## Publishing

To a release a new version:

1. Update the version number in package.json
2. Push the new version to the `master` branch on GitHub
3. Create a `new release` on GitHub for the latest version

This will trigger a GitHub action that tests and publishes the npm package.
