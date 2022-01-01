/**
 * LinkedList data structure
 *
 * Optimised for operations that write to the start ({@link LinkedList.unshift})
 * or end ({@link LinkedList.push}) of the list, or read from the start
 * ({@link LinkedList.unshift}) of the list
 */
export class LinkedList<T> {
  public get head(): undefined | T { return this._head?.value; }
  public get tail(): undefined | T { return this._tail?.value; }
  public get size(): number { return this._size; }

  protected _head: (undefined | LinkedListItem<T>);
  protected _tail: (undefined | LinkedListItem<T>);
  protected _size: number;

  /**
   * Create a new LinkedList
   *
   * @param values  initial values to hydrate
   * @returns       LinkedList instance
   */
  static from<T>(values?: LinkedList<T> | T[] | Iterable<T> | null): LinkedList<T> {
    return new LinkedList(values);
  }

  /**
   * Create a new LinkedList
   *
   * @param values  initial values to hydrate
   */
  constructor(values?:  LinkedList<T> | T[] | Iterable<T> | null) {
    this._size = 0;
    if (values) this.push(...values);
  }

  /**
   * Create an Iterator for the LinkedList's values
   */
  * [Symbol.iterator](): IterableIterator<T> {
    let node: undefined | LinkedListItem<T> = this._head;
    while (node) {
      yield node.value;
      node = node.next;
    }
  }

  /**
   * Push values to the end of the LinkedList
   *
   * @param values  values to push
   * @returns       the LinkedList instance
   */
  push(...values: T[]): this {
    for (const value of values) {
      const prevTail = this._tail;
      const nextTail = new LinkedListItem(value);
      if (!prevTail) {
        this._head = nextTail;
      } else {
        prevTail.next = nextTail;
      }
      this._tail = nextTail;
      this._size += 1;
    }
    return this;
  }

  /**
   * Retrieve and remove the first value from the LinkedList
   *
   * @returns   the value if it exists
   */
  shift(): undefined | T {
    const prevHead = this._head;
    if (!prevHead) return undefined;
    const nextHead = prevHead.next;
    if (!nextHead) {
      this._head = undefined;
      this._tail = undefined;
    } else {
      this._head = nextHead;
    }
    this._size -= 1;
    return prevHead.value;
  }

  /**
   * Push values onto the start of the LinkedList
   *
   * @param values  values to unshift
   * @returns       the LinkedList instance
   */
  unshift(...values: T[]): this {
    for (let i = values.length - 1; i >= 0; i -= 1) {
      const prevHead = this._head;
      const nextHead = new LinkedListItem<T>(values[i]!);
      if (!prevHead) {
        this._tail = nextHead;
      } else {
        nextHead.next = prevHead;
      }
      this._head = nextHead;
      this._size += 1;
    }
    return this;
  }

  /**
   * Remove all values from the LinkedList
   */
  clear(): void {
    this._head = undefined;
    this._tail = undefined;
    this._size = 0;
  }

  /**
   * Execute a callbackfn for each value in the LinkedList
   *
   * @param callbackfn  function to fire for each value
   * @param thisArg     `this` value for callbackfn
   */
  forEach(callbackfn: (value: T, index: number, linkedList: this) => void, thisArg?: any): void {
    for (const [index, value,] of this.entries()) {
      callbackfn.call(thisArg, value, index, this);
    }
  }

  /**
   * Transform the LinkedList using by calling a function on each of its values
   *
   * @param callbackfn  function to tranasform each value
   * @param thisArg     `this` value for callbackfn
   * @returns           the transformed LinkedList
   */
  map<U>(callbackfn: (value: T, index: number, linkedList: this) => U, thisArg?: any): LinkedList<U> {
    const mappedList = new LinkedList<U>();
    for (const [index, value,] of this.entries()) {
      const mappedValue = callbackfn.call(thisArg, value, index, this);
      mappedList.push(mappedValue);
    }
    return mappedList;
  }

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
  filter(callbackfn: (value: T, index: number, linkedList: this) => boolean, thisArg?: any): LinkedList<T> {
    const filteredList = new LinkedList<T>();
    for (const [index, value,] of this.entries()) {
      const keep = callbackfn.call(thisArg, value, index, this);
      if (keep) filteredList.push(value);
    }
    return filteredList;
  }

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
  reduce<U>(callbackfn: (accumulator: U, next: T, index: number, linkedList: this) => U, initialValue: U, thisArg?: any): U {
    let accumulator = initialValue;
    for (const [index, value,] of this.entries()) {
      accumulator = callbackfn.call(thisArg, accumulator, value, index, this);
    }
    return accumulator;
  }

  /**
   * Create an Iterator the LinkedList's values
   *
   * @returns   Iterator of the values in the LinkedList
   */
  values(): IterableIterator<T> {
    return this[Symbol.iterator]();
  }

  /**
   * Create an Iterator the LinkedList's indeces
   *
   * @returns   Iterator of the indeces in the LinkedList
   */
  * keys(): IterableIterator<number> {
    for (const [index,] of this.entries()) {
      yield index;
    }
  }

  /**
   * Create an Iterator for the LinkedList's index-value entries
   *
   * @returns   Iterator of the index-value entries in the LinkedList
   */
  * entries(): IterableIterator<[number, T]> {
    let i = 0;
    for (const value of this) {
      yield [i, value,];
      i += 1;
    }
  }

  /**
   * Create a Map of the LinkedList's index-value entries
   *
   * @returns   Map of the index-value entries in the LinkedList
   */
  toMap(): Map<number, T> {
    const map = new Map(this.toEntriesArray());
    return map;
  }

  /**
   * Create an Array of the LinkedList's entries
   *
   * @returns   Array of index-value entries in the LinkedList
   */
  toEntriesArray(): [number, T][] {
    const array: [number, T][] = Array.from(this.entries());
    return array;
  }

  /**
   * Create an Array of the LinkedList's indeces
   *
   * @returns   Array of indeces in the LinkedList
   */
  toKeysArray(): number[] {
    const array: number[] = Array.from(this.keys());
    return array;
  }

  /**
   * Create an Array of the LinkedList's values
   *
   * Alias for {@link LinkedList.toArray}
   *
   * @returns   Array of values in the LinkedList
   */
  toValuesArray(): T[] {
    return this.toArray();
  }

  /**
   * Create an Array of the LinkedList's values
   *
   * @returns   Array of values in the LinkedList
   */
  toArray(): T[] {
    const array = Array.from(this.values());
    return array;
  }

  /**
   * Create a shallow clone of the LinkedList
   */
  clone(): LinkedList<T> {
    return new LinkedList(this.toArray());
  }

  /**
   * Create a new LinkedList with this LinkedList's values in reverse order
   *
   * @returns           LinkedList with values reversed
   */
  reverse(): LinkedList<T> {
    const array = this.toArray().reverse();
    return new LinkedList(array);
  }

  /**
   * Create a new LinkedList with this LinkedList's values sorted
   *
   * @param compareFn   returns sorting precedence of items
   * @returns           LinkedList with values sorted
   */
  sort(compareFn?: (a: T, b: T) => number): LinkedList<T> {
    const array = this.toArray().reverse();
    array.sort(compareFn);
    return new LinkedList(array);
  }

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
  some(predicate: (value: T, index: number, list: LinkedList<T>) => boolean, thisArg?: any): boolean {
    Array.prototype.some;
    for (const [index, value,] of this.entries()) {
      if (predicate.call(thisArg, value, index, this)) return true;
    }
    return false;
  }

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
  every(predicate: (value: T, index: number, list: LinkedList<T>) => boolean, thisArg?: any): boolean {
    this[Symbol.iterator]().next();
    for (const [index, value,] of this.entries()) {
      if (!predicate.call(thisArg, value, index, this)) return false;
    }
    return true;
  }
}

export class LinkedListItem<T> {
  public value: T;
  public next: undefined | LinkedListItem<T> = undefined;

  constructor(value: T) {
    this.value = value;
  }

  /**
   * Shallow copy the LinkedListItem
   */
  clone(): LinkedListItem<T> {
    const clone = new LinkedListItem(this.value);
    clone.next = this.next;
    return clone;
  }
}