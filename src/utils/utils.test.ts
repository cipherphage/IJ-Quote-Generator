import { defaultStyleClasses } from "./defaults";
import {
  checkArraysEqual,
  getRandomNaturalTypingPauseInMilliseconds,
  getSupportedLocales,
  updateModeInClasses,
  normalizeText,
  checkNormalizedTextEquality,
  decomposeText,
  recomposeText,
  getNewIntlSegments
} from "./helpers";

describe('Calling checkArraysEqualDisregardingDupeElems', function() {
  it('should return boolean indicating if two arrays are equal in every element or not', function() {
    const testArray = [
      { test: {a: [1,2,3], b: [1,2,3]}, expected: true },
      { test: {a: [1,2,3], b: [1,3,2]}, expected: true },
      { test: {a: [1,2,3], b: [2,1,3]}, expected: true },
      { test: {a: [1,2,3], b: [2,3,1]}, expected: true },
      { test: {a: [1,2,3], b: [3,1,2]}, expected: true },
      { test: {a: [1,2,3], b: [3,2,1]}, expected: true },
      { test: {a: [1,1,2,3], b: [1,2,3,1]}, expected: true },
      { test: {a: [1,3,3], b: [3,3,1]}, expected: true },
      { test: {a: [], b: []}, expected: true },
      { test: {a: [1,1,2,3], b: [1,2,3,2]}, expected: false },
      { test: {a: [1,1,1], b: [1,3,3]}, expected: false },
      { test: {a: [1,2,3], b: [1,2,3,3]}, expected: false },
    ];

    testArray.forEach(function(t) {
      const testVal = checkArraysEqual(t.test.a, t.test.b);
      expect(testVal).toStrictEqual(t.expected);
    });
  });
});

describe('Calling getRandomNaturalTypingPauseInMilliseconds', function() {
  it('should return a number of random milliseconds', function() {
    const diff1 = getRandomNaturalTypingPauseInMilliseconds(50, 2);
    expect(diff1).toBeGreaterThan(-1);
    expect(diff1).toBeLessThan(2500);

    const diff2 = getRandomNaturalTypingPauseInMilliseconds(50, 2);
    expect(diff2).toBeGreaterThan(-1);
    expect(diff2).toBeLessThan(2500);

    const diff3 = getRandomNaturalTypingPauseInMilliseconds(50, 2);
    expect(diff3).toBeGreaterThan(-1);
    expect(diff3).toBeLessThan(2500);

    expect((diff1 === diff2) && (diff1 === diff3)).toStrictEqual(false);
  });
});

describe('Calling updateModeInClasses', function() {
  it('should return a classes string with default classes removed and new default mode added. If no mode is provided, then return empty string.', function() {
    const testArray = [
      { test: {c: '', m: 'typewriter'}, expected: defaultStyleClasses.t+' ' },
      { test: {c: '', m: 'negativeTypewriter'}, expected: defaultStyleClasses.nt+' ' },
      { test: {c: '', m: 'blackGreenTerminal'}, expected: defaultStyleClasses.bgt+' ' },
      { test: {c: 'mySpecialClass', m: ''}, expected: '' },
      // This last test is expected to pass but should not be possible in practice.
      { test: {c: 'mySpecialClass', m: 'typewriter'}, expected: defaultStyleClasses.t+' mySpecialClass' },
    ];

    testArray.forEach(function(t) {
      const testVal = updateModeInClasses(t.test.c, t.test.m);
      expect(testVal).toStrictEqual(t.expected);
    });
  });
});

describe('Calling getSupportedLocales', function() {
  it('should check string array of language codes, returns string array of only supported codes, possibly empty.', function() {

    const testArray = [
      { test: ['en'], expected: ['en'] },
      { test: ['zh-hans', 'hant'], expected: ['en'] },
      { test: ['en', 'zh-hant'], expected: ['en', 'zh-Hant'] },
      { test: ['zh-hans', 'zh-hant'], expected: ['zh-Hans', 'zh-Hant'] },
      { test: ['incorrect value'], expected: ['en'] },
    ];

    testArray.forEach(function(t) {
      const testVal = getSupportedLocales(t.test);
      expect(testVal).toStrictEqual(t.expected);
    });
  });
});

describe('Calling normalizeText', function() {
  it('should return string result of JS normalize method.', function() {

    // Expected assumes split('') is called on result.
    const testArray = [
      { test: {a: 'a', b: 'NFC'}, expected: ['a'] },
      { test: {a: 'a', b: 'NFD'}, expected: ['a'] },
      { test: {a: '뭐', b: 'NFC'}, expected: ['뭐'] },
      { test: {a: '뭐', b: 'NFD'}, expected: ['ᄆ', 'ᅯ'] },
      { test: {a: '', b: 'NFD'}, expected: [] },
    ];

    testArray.forEach(function(t) {
      const testVal = normalizeText(t.test.a, t.test.b);
      expect(testVal.split('')).toStrictEqual(t.expected);
    });
  });
});

describe('Calling checkNormalizedTextEquality', function() {
  it('should return boolean comparison indicatiing whether the string is decomposeabe.', function() {
    const testArray = [
      { test: 'a', expected: true },
      { test: '', expected: true },
      { test: '뭐', expected: false },
    ];

    testArray.forEach(function(t) {
      const testVal = checkNormalizedTextEquality(t.test);
      expect(testVal).toStrictEqual(t.expected);
    });
  });
});

describe('Calling decomposeText', function() {
  it('should return Letter array result of decomposing string unicode character.', function() {
    const test1 = {
      test: {a: 'a', b: 1},
      expected: [
        {parentKey: 1, letter: 'a'}
      ]
    };
    const test2 = { 
      test: {a: '', b: 1},
      expected: []
    };
    const test3 = [
      { 
        test: {a: '뭐', b: 1},
        expected: [
          {parentKey: 1, letter: 'ᄆ'},
          {parentKey: 1, letter: 'ᅯ'},]
      },
      { 
        test: {a: 'ド', b: 1},
        expected: [
          {parentKey: 1, letter: 'ト'},
          {parentKey: 1, letter: '゙'},]
      },
    ];

    const testVal1 = decomposeText(test1.test.a, test1.test.b);
    expect(testVal1[0].parentKey).toStrictEqual(test1.expected[0].parentKey);
    expect(testVal1[0].letter).toStrictEqual(test1.expected[0].letter);
    expect(testVal1.length).toStrictEqual(1);

    const testVal2 = decomposeText(test2.test.a, test2.test.b);
    expect(testVal2.length).toStrictEqual(0);

    test3.forEach(function(t) {
      const testVal = decomposeText(t.test.a, t.test.b);
      expect(testVal[0].parentKey).toStrictEqual(t.expected[0].parentKey);
      expect(testVal[0].letter).toStrictEqual(t.expected[0].letter);
      expect(testVal[1].parentKey).toStrictEqual(t.expected[1].parentKey);
      expect(testVal[1].letter).toStrictEqual(t.expected[1].letter);
      expect(testVal.length).toStrictEqual(2);
    });
  });
});

describe('Calling recomposeText', function() {
  it('should return Letter array result of recomposing string unicode characters.', function() {
    const testArray = [
      {
        test: {a: ['a'], b: 1},
        expected: {parentKey: 1, letter: 'a'}
      },
      { 
        test: {a: [''], b: 1},
        expected: {parentKey: 1, letter: ''}
      },
      { 
        test: {a: ['ᄆ', 'ᅯ'], b: 1},
        expected: {parentKey: 1, letter: '뭐'}
      },
      { 
        test: {a: ['ト', '゙'], b: 1},
        expected: {parentKey: 1, letter: 'ド'}
      },
    ];

    testArray.forEach(function(t) {
      const testVal = recomposeText(t.test.a, t.test.b);
      expect(testVal.parentKey).toStrictEqual(t.expected.parentKey);
      expect(testVal.letter).toStrictEqual(t.expected.letter);
    });
  });
});

describe('Calling getNewIntlSegments', function() {
  it('should return new instance of Intl.Segments', function() {
    const testArray = [
      { test: {a: ['en'], b: 'abc'},
        expected: {segment: 'a', index: 0, input: 'abc', length: 3} 
      },
      { test: {a: ['en', 'ko', 'jp'], b: '뭐ド'},
        expected: {segment: '뭐', index: 0, input: '뭐ド', length: 2}
      },
      { test: {a: ['en', 'zh-Hant'], b: '뭐ド'},
        expected: {segment: '뭐', index: 0, input: '뭐ド', length: 2}
      },
      { test: {a: ['en'], b: '뭐ド'},
        expected: {segment: '뭐', index: 0, input: '뭐ド', length: 2}
      },
      { test: {a: ['en'], b: '1'},
        expected: {segment: '1', index: 0, input: '1', length: 1}
      },
      { test: {a: ['en'], b: ' '},
        expected: {segment: ' ', index: 0, input: ' ', length: 1}
      },
      { test: {a: ['jp'], b: ' '},
        expected: {segment: ' ', index: 0, input: ' ', length: 1}
      },
      { test: {a: ['en'], b: ''},
        expected: {length: 0}
      },
      { test: {a: ['jp'], b: ''},
        expected: {length: 0}
      }
    ];

    testArray.forEach(function(t) {
      const [...testVal] = getNewIntlSegments(t.test.a, t.test.b);
      expect(testVal.length).toStrictEqual(t.expected.length);
      if (testVal.length > 0) {
        expect(testVal[0].segment).toStrictEqual(t.expected.segment);
        expect(testVal[0].index).toStrictEqual(t.expected.index);
        expect(testVal[0].input).toStrictEqual(t.expected.input);
      }
    });
  });
});