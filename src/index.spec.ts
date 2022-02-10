import { LinkedList } from '.';

describe('LinkedList', () => {
  describe('new', () => {
    it('should create an empty LinkedList', () => {
      const list = new LinkedList();
      expect(list.size).toBe(0);
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
        const list = new LinkedList();
        expect(list.size).toBe(0);
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
        const list = new LinkedList<string>();
        expect(list.size).toBe(0);
        expect(list.head).toBeUndefined();
        expect(list.tail).toBeUndefined();
        list.push('a');
        expect(list.size).toBe(1);
        expect(list.head).toBe('a');
        expect(list.tail).toBe('a');
        list.push('b');
        expect(list.size).toBe(2);
        expect(list.head).toBe('a');
        expect(list.tail).toBe('b');
        list.push('c');
        expect(list.size).toBe(3);
        expect(list.head).toBe('a');
        expect(list.tail).toBe('c');
      });

      it('should push multiple items in-order onto the LinkedList', () => {
        const list = new LinkedList<string>();
        expect(list.size).toBe(0);
        expect(list.head).toBeUndefined();
        expect(list.tail).toBeUndefined();
        list.push('a', 'b');
        expect(list.size).toBe(2);
        expect(list.head).toBe('a');
        expect(list.tail).toBe('b');
        list.push('c', 'd', 'e');
        expect(list.size).toBe(5);
        expect(list.head).toBe('a');
        expect(list.tail).toBe('e');
      });
    });

    describe('unshift', () => {
      it('should unshift to the start of the LinkedList', () => {
        const list = new LinkedList<string>();
        expect(list.size).toBe(0);
        expect(list.head).toBeUndefined();
        expect(list.tail).toBeUndefined();
        list.unshift('a');
        expect(list.size).toBe(1);
        expect(list.head).toBe('a');
        expect(list.tail).toBe('a');
        list.unshift('b');
        expect(list.size).toBe(2);
        expect(list.head).toBe('b');
        expect(list.tail).toBe('a');
        list.unshift('c');
        expect(list.size).toBe(3);
        expect(list.head).toBe('c');
        expect(list.tail).toBe('a');
      });

      it('should unshift multiple items in-order onto the LinkedList', () => {
        const list = new LinkedList<string>();
        expect(list.size).toBe(0);
        expect(list.head).toBeUndefined();
        expect(list.tail).toBeUndefined();
        list.unshift('a', 'b');
        expect(list.size).toBe(2);
        expect(list.head).toBe('a');
        expect(list.tail).toBe('b');
        list.unshift('c', 'd', 'e');
        expect(list.size).toBe(5);
        expect(list.head).toBe('c');
        expect(list.tail).toBe('b');
      });
    });

    describe('shift', () => {
      it('should shift off the start of the LinkedList', () => {
        const list = new LinkedList<string>();
        expect(list.size).toBe(0);
        expect(list.head).toBeUndefined();
        expect(list.tail).toBeUndefined();
        expect(list.shift()).toBeUndefined();
        list.push('a');
        expect(list.size).toBe(1);
        expect(list.head).toBe('a');
        expect(list.tail).toBe('a');
        expect(list.shift()).toBe('a');
        expect(list.size).toBe(0);
        expect(list.head).toBeUndefined();
        expect(list.tail).toBeUndefined();
        list.push('b', 'c');
        expect(list.size).toBe(2);
        expect(list.head).toBe('b');
        expect(list.tail).toBe('c');
        expect(list.shift()).toBe('b');
        expect(list.size).toBe(1);
        expect(list.head).toBe('c');
        expect(list.tail).toBe('c');
      });
    });

    describe('pop', () => {
      it('should pop off the end of the LinkedList', () => {
        const list = new LinkedList<string>();
        expect(list.size).toBe(0);
        expect(list.head).toBeUndefined();
        expect(list.tail).toBeUndefined();
        expect(list.pop()).toBeUndefined();
        list.push('a');
        expect(list.size).toBe(1);
        expect(list.head).toBe('a');
        expect(list.tail).toBe('a');
        expect(list.pop()).toBe('a');
        expect(list.size).toBe(0);
        expect(list.head).toBeUndefined();
        expect(list.tail).toBeUndefined();
        list.push('b', 'c');
        expect(list.size).toBe(2);
        expect(list.head).toBe('b');
        expect(list.tail).toBe('c');
        expect(list.pop()).toBe('c');
        expect(list.size).toBe(1);
        expect(list.head).toBe('b');
        expect(list.tail).toBe('b');
      });
    });

    describe('insert', () => {
      it('should insert into the start of an empty LinkedList', () => {
        const list = new LinkedList<string>();
        expect(list.size).toBe(0);
        list.insert(0, 'a', 'b', 'c');
        expect(list.size).toBe(3);
        expect(list.head).toBe('a');
        expect(list.tail).toBe('c');
        expect(list.toArray()).toEqual(['a', 'b', 'c',]);
      });

      it('should insert into the end of an empty LinkedList', () => {
        const list = new LinkedList<string>();
        expect(list.size).toBe(0);
        list.insert(50, 'a', 'b', 'c');
        expect(list.size).toBe(3);
        expect(list.head).toBe('a');
        expect(list.tail).toBe('c');
        expect(list.toArray()).toEqual(['a', 'b', 'c',]);
      });

      it('should insert into the start of an empty LinkedList (-ve indexing)', () => {
        const list = new LinkedList<string>();
        expect(list.size).toBe(0);
        list.insert(-50, 'a', 'b', 'c');
        expect(list.size).toBe(3);
        expect(list.head).toBe('a');
        expect(list.tail).toBe('c');
        expect(list.toArray()).toEqual(['a', 'b', 'c',]);
      });

      it('should insert into the start of a non-empty LinkedList', () => {
        const list = new LinkedList<string>(['a', 'b', 'c',]);
        expect(list.size).toBe(3);
        expect(list.head).toBe('a');
        expect(list.tail).toBe('c');
        list.insert(0, 'd', 'e', 'f');
        expect(list.size).toBe(6);
        expect(list.head).toBe('d');
        expect(list.tail).toBe('c');
        expect(list.toArray()).toEqual(['d', 'e', 'f', 'a', 'b', 'c',]);
      });

      it('should insert into the middle of a non-empty LinkedList', () => {
        const list = new LinkedList<string>(['a', 'b', 'c',]);
        expect(list.size).toBe(3);
        expect(list.head).toBe('a');
        expect(list.tail).toBe('c');
        list.insert(1, 'd', 'e', 'f');
        expect(list.size).toBe(6);
        expect(list.head).toBe('a');
        expect(list.tail).toBe('c');
        expect(list.toArray()).toEqual(['a', 'd', 'e', 'f', 'b', 'c',]);
        list.insert(2, 'g', 'h', 'i');
        expect(list.size).toBe(9);
        expect(list.head).toBe('a');
        expect(list.tail).toBe('c');
        expect(list.toArray()).toEqual(['a', 'd', 'g', 'h', 'i', 'e', 'f', 'b', 'c',]);
      });

      it('should insert into the middle of a non-empty LinkedList (-ve indexing)', () => {
        const list = new LinkedList<string>(['a', 'b', 'c',]);
        expect(list.size).toBe(3);
        expect(list.head).toBe('a');
        expect(list.tail).toBe('c');
        list.insert(-1, 'd', 'e', 'f');
        expect(list.size).toBe(6);
        expect(list.head).toBe('a');
        expect(list.tail).toBe('c');
        expect(list.toArray()).toEqual(['a', 'b', 'd', 'e', 'f', 'c',]);
        list.insert(-2, 'g', 'h', 'i');
        expect(list.size).toBe(9);
        expect(list.head).toBe('a');
        expect(list.tail).toBe('c');
        expect(list.toArray()).toEqual(['a', 'b', 'd', 'e', 'g', 'h', 'i', 'f', 'c',]);
      });

      it('should insert into the end of a non-empty LinkedList', () => {
        const list = new LinkedList<string>(['a', 'b', 'c',]);
        expect(list.size).toBe(3);
        expect(list.head).toBe('a');
        expect(list.tail).toBe('c');
        list.insert(list.size, 'd', 'e', 'f');
        expect(list.size).toBe(6);
        expect(list.head).toBe('a');
        expect(list.tail).toBe('f');
        expect(list.toArray()).toEqual(['a', 'b', 'c', 'd', 'e', 'f',]);
        list.insert(500, 'g', 'h', 'i');
        expect(list.size).toBe(9);
        expect(list.head).toBe('a');
        expect(list.tail).toBe('i');
        expect(list.toArray()).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',]);
      });

      it('should NOT insert into the end of a non-empty LinkedList (-ve indexing)', () => {
        const list = new LinkedList<string>(['a', 'b', 'c',]);
        expect(list.size).toBe(3);
        expect(list.head).toBe('a');
        expect(list.tail).toBe('c');
        list.insert(-1, 'd', 'e', 'f');
        expect(list.size).toBe(6);
        expect(list.head).toBe('a');
        expect(list.tail).toBe('c');
        expect(list.toArray()).toEqual(['a', 'b', 'd', 'e', 'f', 'c',]);
      });
    });

    describe('remove', () => {
      it('should remove nothing from an empty LinkedList', () => {
        const list = new LinkedList<string>();
        expect(list.size).toBe(0);
        expect(list.remove(0, 1)).toEqual([]);
        expect(list.size).toBe(0);
        expect(list.remove(0, 2)).toEqual([]);
        expect(list.size).toBe(0);
        expect(list.remove(0, 100)).toEqual([]);
        expect(list.size).toBe(0);
        expect(list.remove(2, 1)).toEqual([]);
        expect(list.size).toBe(0);
        expect(list.remove(30, 2)).toEqual([]);
        expect(list.size).toBe(0);
        expect(list.remove(70, 100)).toEqual([]);
        expect(list.size).toBe(0);
      });

      it('should remove nothing from an empty LinkedList (-ve indexing)', () => {
        const list = new LinkedList<string>();
        expect(list.size).toBe(0);
        expect(list.remove(0, 1)).toEqual([]);
        expect(list.size).toBe(0);
        expect(list.remove(0, 2)).toEqual([]);
        expect(list.size).toBe(0);
        expect(list.remove(0, 100)).toEqual([]);
        expect(list.size).toBe(0);
        expect(list.remove(-2, 1)).toEqual([]);
        expect(list.size).toBe(0);
        expect(list.remove(-30, 2)).toEqual([]);
        expect(list.size).toBe(0);
        expect(list.remove(-70, 100)).toEqual([]);
        expect(list.size).toBe(0);
      });

      it('should remove from the start of a non-empty LinkedList', () => {
        const list = new LinkedList(['a', 'b', 'c', 'd',]);
        expect(list.size).toBe(4);
        expect(list.remove(0, 1)).toEqual(['a',]);
        expect(list.size).toBe(3);
        expect(list.head).toBe('b');
        expect(list.tail).toBe('d');
        expect(list.remove(0, 2)).toEqual(['b', 'c',]);
        expect(list.size).toBe(1);
        expect(list.head).toBe('d');
        expect(list.tail).toBe('d');
      });

      it('should remove from the start of a non-empty LinkedList (-ve indexing)', () => {
        const list = new LinkedList(['a', 'b', 'c', 'd',]);
        expect(list.size).toBe(4);
        expect(list.remove(-4, 1)).toEqual(['a',]);
        expect(list.size).toBe(3);
        expect(list.head).toBe('b');
        expect(list.tail).toBe('d');
        expect(list.remove(-3, 2)).toEqual(['b', 'c',]);
        expect(list.size).toBe(1);
        expect(list.head).toBe('d');
        expect(list.tail).toBe('d');
      });

      it('should remove from the middle of a non-empty LinkedList', () => {
        const list = new LinkedList(['a', 'b', 'c', 'd', 'e',]);
        expect(list.size).toBe(5);
        expect(list.remove(1, 1)).toEqual(['b',]);
        expect(list.size).toBe(4);
        expect(list.head).toBe('a');
        expect(list.tail).toBe('e');
        expect(list.remove(1, 2)).toEqual(['c', 'd',]);
        expect(list.size).toBe(2);
        expect(list.head).toBe('a');
        expect(list.tail).toBe('e');
      });

      it('should remove from the middle of a non-empty LinkedList (-ve indexing)', () => {
        const list = new LinkedList(['a', 'b', 'c', 'd', 'e',]);
        expect(list.size).toBe(5);
        expect(list.remove(-4, 1)).toEqual(['b',]);
        expect(list.size).toBe(4);
        expect(list.head).toBe('a');
        expect(list.tail).toBe('e');
        expect(list.remove(-3, 2)).toEqual(['c', 'd',]);
        expect(list.size).toBe(2);
        expect(list.head).toBe('a');
        expect(list.tail).toBe('e');
      });

      it('should remove from the end of a non-empty LinkedList', () => {
        const list = new LinkedList(['a', 'b', 'c', 'd', 'e',]);
        expect(list.size).toBe(5);
        expect(list.remove(4, 1)).toEqual(['e',]);
        expect(list.size).toBe(4);
        expect(list.head).toBe('a');
        expect(list.tail).toBe('d');
        expect(list.remove(2, 2)).toEqual(['c', 'd',]);
        expect(list.size).toBe(2);
        expect(list.head).toBe('a');
        expect(list.tail).toBe('b');
      });

      it('should remove from the end of a non-empty LinkedList (-ve indexing)', () => {
        const list = new LinkedList(['a', 'b', 'c', 'd', 'e',]);
        expect(list.size).toBe(5);
        expect(list.remove(-1, 1)).toEqual(['e',]);
        expect(list.size).toBe(4);
        expect(list.head).toBe('a');
        expect(list.tail).toBe('d');
        expect(list.remove(-2, 2)).toEqual(['c', 'd',]);
        expect(list.size).toBe(2);
        expect(list.head).toBe('a');
        expect(list.tail).toBe('b');
      });
    });

    describe('clear', () => {
      it('should remove all items from the linked list', () => {
        const list = new LinkedList<string>(['a', 'b', 'c',]);
        expect(list.size).toBe(3);
        expect(list.head).toBe('a');
        expect(list.tail).toBe('c');
        list.clear();
        expect(list.size).toBe(0);
        expect(list.head).toBeUndefined();
        expect(list.tail).toBeUndefined();
      });
    });

    describe('replace', () => {
      it('should fire `callbackfn` for each item in the LinkedList', () => {
        const list = new LinkedList<string>(['a', 'b', 'c',]);
        const expected = [
          ['a', 0, list,],
          ['b', 1, list,],
          ['c', 2, list,],
        ];
        const actual: [value: string, index: number, ll: LinkedList<string>][] = [];
        let neverCalled = true;
        list.replace(
          (...values) => {
            actual.push(values);
            return false;
          },
          () => {
            neverCalled = false;
            return 'never called';
          }
        );
        expect(actual).toEqual(expected);
        expect(neverCalled).toBeTruthy();
      });

      it('should replace the matching value', () => {
        const list = new LinkedList<[letter: string, index: number]>([
          ['a', 0,],
          ['b', 1,],
          ['c', 2,],
        ]);
        const expected = ['c', 3,] as [string, number];
        const actual = list.replace(
          ([l,]) => l === 'b',
          () => expected,
        );
        expect(actual).toEqual(expected);
        expect(list.toArray()).toEqual([
          ['a', 0,],
          ['c', 3,],
          ['c', 2,],
        ]);
      });

      it('should replce the first matching value', () => {
        const list = new LinkedList<[letter: string, index: number]>([
          ['a', 0,],
          ['b', 1,],
          ['b', 2,],
          ['c', 3,],
        ]);
        const expected = ['c', 4,] as [string, number];
        const actual = list.replace(
          ([l,]) => l === 'b',
          () => expected,
        );
        expect(actual).toEqual(expected);
        expect(list.toArray()).toEqual([
          ['a', 0,],
          ['c', 4,],
          ['b', 2,],
          ['c', 3,],
        ]);
      });

      it('should return undefined if the value does not exist', () => {
        const list = new LinkedList<[letter: string, index: number]>([
          ['a', 0,],
          ['b', 1,],
          ['b', 2,],
          ['c', 3,],
        ]);
        const expected = ['c', 4,] as [string, number];
        const actual = list.replace(
          ([l,]) => l === 'e',
          () => expected,
        );
        expect(actual).toEqual(undefined);
        expect(list.toArray()).toEqual([
          ['a', 0,],
          ['b', 1,],
          ['b', 2,],
          ['c', 3,],
        ]);
      });
    });

    describe('find', () => {
      it('should fire `callbackfn` for each item in the LinkedList', () => {
        const list = new LinkedList<string>(['a', 'b', 'c',]);
        const expected = [
          ['a', 0, list,],
          ['b', 1, list,],
          ['c', 2, list,],
        ];
        const actual: [value: string, index: number, ll: LinkedList<string>][] = [];
        list.find((...values) => {
          actual.push(values);
          return false;
        });
        expect(actual).toEqual(expected);
      });

      it('should return the matching value', () => {
        const list = new LinkedList<[letter: string, index: number]>([
          ['a', 0,],
          ['b', 1,],
          ['c', 2,],
        ]);
        const expected = ['b', 1,];
        const actual = list.find(([l,]) => l === 'b');
        expect(actual).toEqual(expected);
      });

      it('should return the first matching value', () => {
        const list = new LinkedList<[letter: string, index: number]>([
          ['b', 1,],
          ['b', 2,],
        ]);
        const expected = ['b', 1,];
        const actual = list.find(([l,]) => l === 'b');
        expect(actual).toEqual(expected);
      });

      it('should return undefined if the value does not exist', () => {
        const list = new LinkedList<[letter: string, index: number]>([
          ['a', 0,],
          ['c', 2,],
        ]);
        const expected = undefined;
        const actual = list.find(([l,]) => l === 'b');
        expect(actual).toEqual(expected);
      });
    });

    describe('forEach', () => {
      it('should fire `callbackfn` for each item in the LinkedList', () => {
        const list = new LinkedList<string>(['a', 'b', 'c',]);
        const expected = [
          ['a', 0, list,],
          ['b', 1, list,],
          ['c', 2, list,],
        ];
        const actual: [value: string, index: number, ll: LinkedList<string>][] = [];
        list.forEach((...values) => actual.push(values));
        expect(actual).toEqual(expected);
      });
    });

    describe('map', () => {
      it('should map values and fire `callbackfn` for each item in the LinkedList', () => {
        const listIn = new LinkedList<string>(['a', 'b', 'c',]);
        const expected = [
          ['a', 0, listIn,],
          ['b', 1, listIn,],
          ['c', 2, listIn,],
        ];
        const actual: [value: string, index: number, ll: LinkedList<string>][] = [];
        const listOut = listIn.map((...values) => {
          const [value,] = values;
          actual.push(values);
          return String.fromCharCode(value.charCodeAt(0) + 1);
        });

        // expect called all
        expect(actual).toEqual(expected);

        // expect immutable
        expect(listIn).not.toBe(listOut);

        // expect output
        expect(listOut.toArray()).toEqual(['b', 'c', 'd',]);
      });
    });

    describe('filter', () => {
      it('should map values and fire `callbackfn` for each item in the LinkedList', () => {
        const listIn = new LinkedList<string>(['a', 'b', 'c',]);
        const expected = [
          ['a', 0, listIn,],
          ['b', 1, listIn,],
          ['c', 2, listIn,],
        ];
        const actual: [value: string, index: number, ll: LinkedList<string>][] = [];
        const listOut = listIn.filter((...values) => {
          const [value,] = values;
          actual.push(values);
          return value !== 'b';
        });

        // expect called all
        expect(actual).toEqual(expected);

        // expect immutable
        expect(listIn).not.toBe(listOut);

        // expect output
        expect(listOut.toArray()).toEqual(['a', 'c',]);
      });
    });

    describe('reduce', () => {
      it('should map values and fire `callbackfn` for each item in the LinkedList', () => {
        const listIn = new LinkedList<string>(['a', 'b', 'c',]);
        const expected = [
          [0, 'a', 0, listIn,],
          ['a'.charCodeAt(0), 'b', 1, listIn,],
          ['a'.charCodeAt(0) + 'b'.charCodeAt(0), 'c', 2, listIn,],
        ];
        const actual: [
        acc: number,
        value: string,
        index: number,
        ll: LinkedList<string>,
        ][] = [];
        const out = listIn.reduce((...values) => {
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
        const list = new LinkedList(['a', 'b', 'c',]);
        const expected = ['a', 'b', 'c',];
        const actual: string[] = [];
        for (const value of list.values()) {
          actual.push(value);
        }
        expect(actual).toEqual(expected);
      });
    });

    describe('entries', () => {
      it('should return an iterator for each entry in the LinkedList', () => {
        const list = new LinkedList(['a', 'b', 'c',]);
        const expected = [[0, 'a',], [1, 'b',], [2, 'c',],];
        const actual: [number, string][] = [];
        for (const [index, value,] of list.entries()) {
          actual.push([index, value,]);
        }
        expect(actual).toEqual(expected);
      });
    });

    describe('toMap', () => {
      it('should return a map of the entries', () => {
        const list = new LinkedList(['a', 'b', 'c',]);
        const expected = new Map([[0, 'a',], [1, 'b',], [2, 'c',],]);
        const actual: typeof expected = list.toMap();
        expect(actual).toEqual(expected);
      });
    });

    describe('toEntriesArray', () => {
      it('should return an array of the entries', () => {
        const list = new LinkedList(['a', 'b', 'c',]);
        const expected = [[0, 'a',], [1, 'b',], [2, 'c',],];
        const actual: typeof expected = list.toEntriesArray();
        expect(actual).toEqual(expected);
      });
    });

    describe('toKeysArray', () => {
      it('should return an array of the keys', () => {
        const list = new LinkedList(['a', 'b', 'c',]);
        const expected = [0, 1, 2,];
        const actual: typeof expected = list.toKeysArray();
        expect(actual).toEqual(expected);
      });
    });

    describe('toValuesArray', () => {
      it('should return an array of the values', () => {
        const list = new LinkedList(['a', 'b', 'c',]);
        const expected = ['a', 'b', 'c',];
        const actual: typeof expected = list.toValuesArray();
        expect(actual).toEqual(expected);
      });
    });

    describe('toArray', () => {
      it('should return an array of the values', () => {
        const list = new LinkedList(['a', 'b', 'c',]);
        const expected = ['a', 'b', 'c',];
        const actual: typeof expected = list.toValuesArray();
        expect(actual).toEqual(expected);
      });
    });

    describe('clone', () => {
      it('should return a shallow copy of the LinkedList', () => {
        const list = new LinkedList(['a', 'b', 'c',]);
        const clone = list.clone();
        expect(clone).not.toBe(list);
        expect(clone).toEqual(list);
        list.unshift('d');
        expect(clone).not.toEqual(list);
        list.shift();
        expect(clone).toEqual(list);
      });
    });

    describe('reverse', () => {
      it('should immutably reverse the LinkedList', () => {
        const list = new LinkedList(['a', 'b', 'c',]);
        const expected = new LinkedList(['c', 'b', 'a',]);
        const actual = list.reverse();
        // immutable
        expect(actual).not.toBe(list);
        // reversed
        expect(actual).toEqual(expected);
      });
    });

    describe('sort', () => {
      it('should sort alphabetically by default', () => {
        const list = new LinkedList(['c', 'a', 'b',]);
        const expected = new LinkedList(['a', 'b', 'c',]);
        const actual = list.sort();
        // immutable
        expect(actual).not.toBe(list);
        // reversed
        expect(actual).toEqual(expected);
      });

      it('should sort given compareFn', () => {
        const list = new LinkedList([2, 1, 3,]);
        const expectedAsc = new LinkedList([1, 2, 3,]);
        const expectedDesc = new LinkedList([3, 2, 1,]);
        const actualAsc = list.sort((a, b) => a - b);
        const actualDesc = list.sort((a, b) => b - a);
        // immutable
        expect(actualAsc).not.toBe(list);
        expect(actualDesc).not.toBe(list);
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
