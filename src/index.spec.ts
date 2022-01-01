import { LinkedList } from '.';

describe('LinkedList', () => {
  describe('new', () => {
    it('should create an empty LinkedList', () => {
      const ll = new LinkedList();
      expect(ll.size).toBe(0);
    });

    it('should create a non-empty LinkedList', () => {
      expect(new LinkedList([]).size).toBe(0);
      expect(new LinkedList([0,]).size).toBe(1);
      expect(new LinkedList([0,1,]).size).toBe(2);
      expect(new LinkedList([0,1,2,]).size).toBe(3);
      expect(new LinkedList([0,1,2,3,]).size).toBe(4);
    });
  });

  describe('static', () => {
    describe('from', () => {
      it('should create an empty LinkedList', () => {
        const ll = new LinkedList();
        expect(ll.size).toBe(0);
      });

      it('should create a non-empty LinkedList', () => {
        expect(new LinkedList([]).size).toBe(0);
        expect(new LinkedList([0,]).size).toBe(1);
        expect(new LinkedList([0,1,]).size).toBe(2);
        expect(new LinkedList([0,1,2,]).size).toBe(3);
        expect(new LinkedList([0,1,2,3,]).size).toBe(4);
      });
    });
  });


  describe('prototype', () => {
    describe('push', () => {
      it('should push to the end of the LinkedList', () => {
        const ll = new LinkedList<string>();
        expect(ll.size).toBe(0);
        expect(ll.head).toBeUndefined();
        expect(ll.tail).toBeUndefined();
        ll.push('a');
        expect(ll.size).toBe(1);
        expect(ll.head).toBe('a');
        expect(ll.tail).toBe('a');
        ll.push('b');
        expect(ll.size).toBe(2);
        expect(ll.head).toBe('a');
        expect(ll.tail).toBe('b');
        ll.push('c');
        expect(ll.size).toBe(3);
        expect(ll.head).toBe('a');
        expect(ll.tail).toBe('c');
      });

      it('should push multiple items in-order onto the LinkedList', () => {
        const ll = new LinkedList<string>();
        expect(ll.size).toBe(0);
        expect(ll.head).toBeUndefined();
        expect(ll.tail).toBeUndefined();
        ll.push('a', 'b');
        expect(ll.size).toBe(2);
        expect(ll.head).toBe('a');
        expect(ll.tail).toBe('b');
        ll.push('c', 'd', 'e');
        expect(ll.size).toBe(5);
        expect(ll.head).toBe('a');
        expect(ll.tail).toBe('e');
      });
    });

    describe('unshift', () => {
      it('should unshift to the start of the LinkedList', () => {
        const ll = new LinkedList<string>();
        expect(ll.size).toBe(0);
        expect(ll.head).toBeUndefined();
        expect(ll.tail).toBeUndefined();
        ll.unshift('a');
        expect(ll.size).toBe(1);
        expect(ll.head).toBe('a');
        expect(ll.tail).toBe('a');
        ll.unshift('b');
        expect(ll.size).toBe(2);
        expect(ll.head).toBe('b');
        expect(ll.tail).toBe('a');
        ll.unshift('c');
        expect(ll.size).toBe(3);
        expect(ll.head).toBe('c');
        expect(ll.tail).toBe('a');
      });

      it('should unshift multiple items in-order onto the LinkedList', () => {
        const ll = new LinkedList<string>();
        expect(ll.size).toBe(0);
        expect(ll.head).toBeUndefined();
        expect(ll.tail).toBeUndefined();
        ll.unshift('a', 'b');
        expect(ll.size).toBe(2);
        expect(ll.head).toBe('a');
        expect(ll.tail).toBe('b');
        ll.unshift('c', 'd', 'e');
        expect(ll.size).toBe(5);
        expect(ll.head).toBe('c');
        expect(ll.tail).toBe('b');
      });
    });

    describe('clear', () => {
      it('should remove all items from the linked list', () => {
        const ll = new LinkedList<string>(['a', 'b', 'c',]);
        expect(ll.size).toBe(3);
        expect(ll.head).toBe('a');
        expect(ll.tail).toBe('c');
        ll.clear();
        expect(ll.size).toBe(0);
        expect(ll.head).toBeUndefined();
        expect(ll.tail).toBeUndefined();
      });
    });

    describe('forEach', () => {
      it('should fire `callbackfn` for each item in the LinkedList', () => {
        const ll = new LinkedList<string>(['a', 'b', 'c',]);
        const expected = [
          ['a', 0, ll,],
          ['b', 1, ll,],
          ['c', 2, ll,],
        ];
        const actual: [value: string, index: number, ll: LinkedList<string>][] = [];
        ll.forEach((...values) => actual.push(values));
        expect(actual).toEqual(expected);
      });
    });

    describe('map', () => {
      it('should map values and fire `callbackfn` for each item in the LinkedList', () => {
        const llIn = new LinkedList<string>(['a', 'b', 'c',]);
        const expected = [
          ['a', 0, llIn,],
          ['b', 1, llIn,],
          ['c', 2, llIn,],
        ];
        const actual: [value: string, index: number, ll: LinkedList<string>][] = [];
        const llOut = llIn.map((...values) => {
          const [value,] = values;
          actual.push(values);
          return String.fromCharCode(value.charCodeAt(0) + 1);
        });

        // expect called all
        expect(actual).toEqual(expected);

        // expect immutable
        expect(llIn).not.toBe(llOut);

        // expect output
        expect(llOut.toArray()).toEqual(['b', 'c', 'd',]);
      });
    });

    describe('filter', () => {
      it('should map values and fire `callbackfn` for each item in the LinkedList', () => {
        const llIn = new LinkedList<string>(['a', 'b', 'c',]);
        const expected = [
          ['a', 0, llIn,],
          ['b', 1, llIn,],
          ['c', 2, llIn,],
        ];
        const actual: [value: string, index: number, ll: LinkedList<string>][] = [];
        const llOut = llIn.filter((...values) => {
          const [value,] = values;
          actual.push(values);
          return value !== 'b';
        });

        // expect called all
        expect(actual).toEqual(expected);

        // expect immutable
        expect(llIn).not.toBe(llOut);

        // expect output
        expect(llOut.toArray()).toEqual(['a', 'c',]);
      });
    });

    describe('reduce', () => {
      it('should map values and fire `callbackfn` for each item in the LinkedList', () => {
        const llIn = new LinkedList<string>(['a', 'b', 'c',]);
        const expected = [
          [0, 'a', 0, llIn,],
          ['a'.charCodeAt(0), 'b', 1, llIn,],
          ['a'.charCodeAt(0) + 'b'.charCodeAt(0), 'c', 2, llIn,],
        ];
        const actual: [
        acc: number,
        value: string,
        index: number,
        ll: LinkedList<string>,
        ][] = [];
        const out = llIn.reduce((...values) => {
          const [acc, next,] = values;
          actual.push(values);
          return acc + next.charCodeAt(0);
        }, 0);

        // expect called all
        expect(actual).toEqual(expected);

        // expect output
        expect(out).toEqual('a'.charCodeAt(0) + 'b'.charCodeAt(0) + 'c'.charCodeAt(0));
      });
    });

    describe('values', () => {
      it('should return an iterator for each value in the LinkedList', () => {
        const ll = new LinkedList(['a', 'b', 'c',]);
        const expected = ['a', 'b', 'c',];
        const actual: string[] = [];
        for (const value of ll.values()) {
          actual.push(value);
        }
        expect(actual).toEqual(expected);
      });
    });

    describe('entries', () => {
      it('should return an iterator for each entry in the LinkedList', () => {
        const ll = new LinkedList(['a', 'b', 'c',]);
        const expected = [[0, 'a',], [1, 'b',], [2, 'c',],];
        const actual: [number, string][] = [];
        for (const [index, value,] of ll.entries()) {
          actual.push([index, value,]);
        }
        expect(actual).toEqual(expected);
      });
    });

    describe('toMap', () => {
      it('should return a map of the entries', () => {
        const ll = new LinkedList(['a', 'b', 'c',]);
        const expected = new Map([[0, 'a',], [1, 'b',], [2, 'c',],]);
        const actual: typeof expected = ll.toMap();
        expect(actual).toEqual(expected);
      });
    });

    describe('toEntriesArray', () => {
      it('should return an array of the entries', () => {
        const ll = new LinkedList(['a', 'b', 'c',]);
        const expected = [[0, 'a',], [1, 'b',], [2, 'c',],];
        const actual: typeof expected = ll.toEntriesArray();
        expect(actual).toEqual(expected);
      });
    });

    describe('toKeysArray', () => {
      it('should return an array of the keys', () => {
        const ll = new LinkedList(['a', 'b', 'c',]);
        const expected = [0, 1, 2,];
        const actual: typeof expected = ll.toKeysArray();
        expect(actual).toEqual(expected);
      });
    });

    describe('toValuesArray', () => {
      it('should return an array of the values', () => {
        const ll = new LinkedList(['a', 'b', 'c',]);
        const expected = ['a', 'b', 'c',];
        const actual: typeof expected = ll.toValuesArray();
        expect(actual).toEqual(expected);
      });
    });

    describe('toArray', () => {
      it('should return an array of the values', () => {
        const ll = new LinkedList(['a', 'b', 'c',]);
        const expected = ['a', 'b', 'c',];
        const actual: typeof expected = ll.toValuesArray();
        expect(actual).toEqual(expected);
      });
    });

    describe('clone', () => {
      it('should return a shallow copy of the LinkedList', () => {
        const ll = new LinkedList(['a', 'b', 'c',]);
        const clone = ll.clone();
        expect(clone).not.toBe(ll);
        expect(clone).toEqual(ll);
        ll.unshift('d');
        expect(clone).not.toEqual(ll);
        ll.shift();
        expect(clone).toEqual(ll);
      });
    });

    describe('reverse', () => {
      it('should immutably reverse the LinkedList', () => {
        const ll = new LinkedList(['a', 'b', 'c',]);
        const expected = new LinkedList(['c', 'b', 'a',]);
        const actual = ll.reverse();
        // immutable
        expect(actual).not.toBe(ll);
        // reversed
        expect(actual).toEqual(expected);
      });
    });

    describe('sort', () => {
      it('should sort alphabetically by default', () => {
        const ll = new LinkedList(['c', 'a', 'b',]);
        const expected = new LinkedList(['a', 'b', 'c',]);
        const actual = ll.sort();
        // immutable
        expect(actual).not.toBe(ll);
        // reversed
        expect(actual).toEqual(expected);
      });

      it('should sort given compareFn', () => {
        const ll = new LinkedList([2, 1, 3,]);
        const expectedAsc = new LinkedList([1, 2, 3,]);
        const expectedDesc = new LinkedList([3, 2, 1,]);
        const actualAsc = ll.sort((a, b) => a - b);
        const actualDesc = ll.sort((a, b) => b - a);
        // immutable
        expect(actualAsc).not.toBe(ll);
        expect(actualDesc).not.toBe(ll);
        // sorted
        expect(actualAsc).toEqual(expectedAsc);
        expect(actualDesc).toEqual(expectedDesc);
      });
    });

    describe('some', () => {
      it('should return true if any predicate call returns truthy', () => {
        const list = new LinkedList(['a', 'b', 'c',]);
        const result = list.some((value) => value === 'b');
        expect(result).toBeTruthy();
      });

      it('should return false if no predicate calls returns truthy', () => {
        const list = new LinkedList(['a', 'b', 'c',]);
        const result = list.some((value) => value === 'B');
        expect(result).toBeFalsy();
      });

      it('should exit early if a truthy value is found', () => {
        let calls = 0;
        const list = new LinkedList(['a', 'b', 'c',]);
        const result = list.some((value) => {
          calls += 1;
          return value === 'b';
        });
        expect(result).toBeTruthy();
        expect(calls).toBe(2);
      });
    });

    describe('every', () => {
      it('should return false if any predicate call returns falsy', () => {
        const list = new LinkedList(['a', 'b', 'c',]);
        const result = list.every((value) => value !== 'b');
        expect(result).toBeFalsy();
      });

      it('should return true if all predicatee calls returns truthy', () => {
        const list = new LinkedList(['a', 'b', 'c',]);
        const result = list.every((value) => typeof value === 'string');
        expect(result).toBeTruthy();
      });

      it('should exit early if a falsy value is found', () => {
        let calls = 0;
        const list = new LinkedList(['a', 'b', 'c',]);
        const result = list.every((value) => {
          calls += 1;
          return value !== 'b';
        });
        expect(result).toBeFalsy();
        expect(calls).toBe(2);
      });
    });
  });
});
