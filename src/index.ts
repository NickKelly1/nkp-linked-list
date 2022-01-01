/**
 * Doubly Linked List data structure
 *
 * Optimised for operations that write to the start ({@link LinkedList.unshift})
 * or end ({@link LinkedList.push}) of the list, or read from the start
 * ({@link LinkedList.unshift}) or end ({@link LinkedList.pop}) of the list
 */
export class LinkedList<T> {
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
   * Calculate the real index of a possibly negative index
   *
   * @param length  length of the lengthable to index
   * @param index   possibly negative provided index
   * @returns       forward index (also possibly negative if overflowing length)
   */
  static calculateIndex(length: number, index: number): number {
    if (index >= 0) return index;
    return length + index;
  }

  /**
   * Value at the head of the linked list, if it exists
   */
  public get head(): undefined | T {
    return this._head?.value;
  }

  /**
   * Value at the tail of the linked list, if it exists
   */
  public get tail(): undefined | T {
    return this._tail?.value;
  }

  /**
   * Number of items in the linked list
   */
  public get size(): number {
    return this._size;
  }

  protected _head: (undefined | LinkedListItem<T>);
  protected _tail: (undefined | LinkedListItem<T>);
  protected _size: number;

  /**
   * Create a new LinkedList
   *
   * @param values  initial values to hydrate
   */
  constructor(values?:  LinkedList<T> | T[] | Iterable<T> | null) {
    this._size = 0;
    if (values) this.push(...values);
  }

  //
  // Iterators
  //

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

  //
  // Mutation
  //

  /**
   * Push values to the end of the LinkedList
   *
   * @param values  values to push
   * @returns       the number of items inserted
   */
  push(...values: T[]): number {
    this.insert(this.size, ...values);
    return values.length;
  }

  /**
   * Push values onto the start of the LinkedList
   *
   * @param values  values to unshift
   * @returns       the number of items inserted
   */
  unshift(...values: T[]): number {
    this.insert(0, ...values);
    return values.length;
  }

  /**
   * Retrieve and remove the first value from the LinkedList
   *
   * @returns   the value if it exists
   */
  shift(): undefined | T {
    return this.remove(0, 1)[0];
  }

  /**
   * Retrieve and remove the last value from the LinkedList
   *
   * @returns   the value if it exists
   */
  pop(): undefined | T {
    return this.remove(-1, 1)[0];
  }

  /**
   * Insert values at the given index
   *
   * Supports negative indexing
   *
   * @param from      first index to insert into
   * @param values    values to insert
   * @returns         the number of values inserted
   */
  insert(from: number, ...values: T[]): number {
    // short circuit
    if (values.length === 0) return values.length;

    // calculate and bound index
    let insertIndex = LinkedList.calculateIndex(this.size, from);
    if (insertIndex < 0) insertIndex = 0;

    // find before & after items
    let before: undefined | LinkedListItem<T>;
    let after: undefined | LinkedListItem<T>;
    if  (insertIndex <= this.size / 2) {
      // inserting into first half
      // search for before & behind starting @ head
      after = this._head;
      for (let i = 0; i < Math.min(insertIndex, this.size); i += 1) {
        before = after;
        after = after!.next;
      }
    } else {
      // inserting second first half
      // search from before & behind starting @ tail
      before = this._tail;
      for (let i = this.size - 1; i >= insertIndex; i -= 1) {
        after = before;
        before = before!.prev;
      }
    }

    // insert between the before & after nodes
    for (const value of values) {
      const current = new LinkedListItem(value);

      this._size += 1;
      // this is head
      if (!before) this._head = current;
      // this is tail
      if (!after) this._tail = current;

      // splice into place
      if (before) before.next = current;
      if (after) after.prev = current;
      current.prev = before;
      current.next = after;
      before = current;
    }

    return values.length;
  }

  /**
   * Remove values starting at the given index
   *
   * Supports negative indexing
   *
   * @param from
   * @param deleteCount
   */
  remove(from: number, deleteCount = 1): T[] {
    // normalize index
    let spliceIndex = LinkedList.calculateIndex(this.size, from);
    if (spliceIndex < 0) spliceIndex = 0;
    const deleted: T[] = [];
    if (spliceIndex <= this.size / 2) {
      // splicing starts in first half
      // sstart search @ head
      let i = 0;
      let current: undefined | LinkedListItem<T> = this._head;
      while (current) {
        if (i > this.size) break;
        if (i >= spliceIndex + deleteCount) break;

        const next = current.next;
        const prev = current.prev;
        if (i < spliceIndex) {
        // not in the delete zone yet
          current = next;
          i += 1;
          continue;
        }

        // in the delete zone
        deleted.push(current.value);
        // this is the tail
        if (!next) this._tail = prev;
        // this is the head
        if (!prev) this._head = next;
        this._size -= 1;
        // connect the before & after items
        if (prev) prev.next = next;
        if (next) next.prev = prev;
        current = next;
        i += 1;
      }
    } else {
      // splicing starts in second half
      // sstart search @ tail
      let current: undefined | LinkedListItem<T> = this._tail;
      let i = this.size - 1;
      while (current) {
        if (i < 0) break;
        if (i < spliceIndex) break;

        const next = current.next;
        const prev = current.prev;
        if (i > spliceIndex + deleteCount) {
          // not in the delete zone yet
          current = prev;
          i += 1;
          continue;
        }

        // in the delete zone
        deleted.push(current.value);
        // this is the tail
        if (!next) this._tail = prev;
        // this is the head
        if (!prev) this._head = next;
        this._size -= 1;
        // connect the before & after items
        if (prev) prev.next = next;
        if (next) next.prev = prev;
        current = prev;
        i -= 1;
      }
      deleted.reverse();
    }
    return deleted;
  }

  /**
   * Remove all values from the LinkedList
   */
  clear(): void {
    this._head = undefined;
    this._tail = undefined;
    this._size = 0;
  }

  //
  // Traversal
  //

  /**
   * Execute a callbackfn for each value in the LinkedList
   *
   * @param callbackfn  function to fire for each value
   * @param thisArg     `this` value for callbackfn
   */
  forEach(callbackfn: (value: T, index: number, linkedList: this) => void, thisArg?: any): void {
    let index = 0;
    let node = this._head;
    while (node) {
      const value = node.value;
      callbackfn.call(thisArg, value, index, this);
      node = node.next;
      index += 1;
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
    this.forEach((value, index, self) => {
      const mappedValue = callbackfn.call(thisArg, value, index, self);
      mappedList.push(mappedValue);
    });
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
    this.forEach((value, index, self) => {
      const keep = callbackfn.call(thisArg, value, index, self);
      if (keep) filteredList.push(value);
    });
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
    this.forEach((value, index, self) => {
      accumulator = callbackfn.call(thisArg, accumulator, value, index, self);
    });
    return accumulator;
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
    for (const [index, value,] of this.entries()) {
      if (predicate.call(thisArg, value, index, this)) {
        return true;
      }
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
    for (const [index, value,] of this.entries()) {
      if (!predicate.call(thisArg, value, index, this)) {
        return false;
      }
    }
    return true;
  }

  //
  // Transformation methods
  //

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

  //
  // Aggregation methods
  //

  /**
   * Create a shallow clone of the LinkedList
   */
  clone(): LinkedList<T> {
    return new LinkedList(this.toArray());
  }

  /**
   * Create an Array of the LinkedList's values
   *
   * @returns   Array of values in the LinkedList
   */
  toArray(): T[] {
    const array: T[] = [];
    this.forEach((value) => array.push(value));
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
   * Create an Array of the LinkedList's indeces
   *
   * @returns   Array of indeces in the LinkedList
   */
  toKeysArray(): number[] {
    const array: number[] = [];
    this.forEach((_, index) => array.push(index));
    return array;
  }

  /**
   * Create an Array of the LinkedList's entries
   *
   * @returns   Array of index-value entries in the LinkedList
   */
  toEntriesArray(): [number, T][] {
    const array: [number, T][] = [];
    this.forEach((value, index) => array.push([index, value,]));
    return array;
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
}

export class LinkedListItem<T> {
  public value: T;
  public next: undefined | LinkedListItem<T> = undefined;
  public prev: undefined | LinkedListItem<T> = undefined;

  constructor(value: T) {
    this.value = value;
  }

  /**
   * Shallow copy the LinkedListItem
   */
  clone(): LinkedListItem<T> {
    const clone = new LinkedListItem(this.value);
    clone.next = this.next;
    clone.prev = this.prev;
    return clone;
  }
}
