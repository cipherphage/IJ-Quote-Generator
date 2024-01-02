import { defaultStyleClasses } from "./defaults";
import { getRandomMillis, updateModeInClasses } from "./helpers";

describe('Calling typerPauseRandom', function() {
  it('should return a promise that waits for random milliseconds', function() {

      const diff1 = getRandomMillis(50, 2);
      expect(diff1).toBeGreaterThan(0);
      expect(diff1).toBeLessThan(2500);

      const diff2 = getRandomMillis(50, 2);
      expect(diff2).toBeGreaterThan(0);
      expect(diff2).toBeLessThan(2500);

      const diff3 = getRandomMillis(50, 2);
      expect(diff3).toBeGreaterThan(0);
      expect(diff3).toBeLessThan(2500);

      expect(diff1 !== diff2).toStrictEqual(true);
      expect(diff2 !== diff3).toStrictEqual(true);
      expect(diff1 !== diff3).toStrictEqual(true);
  });
});

describe('Calling updateModeInClasses', function() {
  it('should return a string indicated who won or else that there are no winners', function() {
    const testArray = [
      { test: {c: '', m: 'typewriter'}, expected: defaultStyleClasses.t+' ' },
      { test: {c: '', m: 'negativeTypewriter'}, expected: defaultStyleClasses.nt+' ' },
      { test: {c: '', m: 'blackGreenTerminal'}, expected: defaultStyleClasses.bgt+' ' },
      { test: {c: 'mySpecialClass', m: ''}, expected: 'mySpecialClass' },
      { test: {c: 'mySpecialClass', m: 'typewriter'}, expected: defaultStyleClasses.t+' '+'mySpecialClass' },
    ];

    testArray.forEach(function(t) {
      const testVal = updateModeInClasses(t.test.c, t.test.m);
      expect(testVal).toStrictEqual(t.expected);
    });
  });
});