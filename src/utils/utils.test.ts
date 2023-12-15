import { defaultStyleClasses } from "./defaults";
import { typerPauseRandom, updateModeInClasses } from "./helpers";

describe('Calling typerPauseRandom', function() {
  it('should return a promise that waits for random milliseconds', async () => {
      const timeStart = Date.now();
      await typerPauseRandom(50, 2);
      const timeEnd = Date.now();

      expect(timeEnd - timeStart).toBeGreaterThan(1);
      expect(timeEnd - timeStart).toBeLessThan(2500);
  });
});

describe('Calling updateModeInClasses', function() {
  it('should return a string indicated who won or else that there are no winners', function() {
    const testArray = [
      { test: {c: '', m: 'typewriter'}, expected: defaultStyleClasses.t+' ' }
    ];

    testArray.forEach(function(t) {
      const testVal = updateModeInClasses(t.test.c, t.test.m);
      expect(testVal).toStrictEqual(t.expected);
    });
  });
});