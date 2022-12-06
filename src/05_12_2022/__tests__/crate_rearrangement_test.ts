import * as jest from 'jest';
import { rangeOverlapCheck, Range, countContainedPairs, countOverlappedPairs } from '../cleaning_assignment';

describe('Cleaning Assignments', () => {

  describe('moveCrate', () => {
    it("updates crate state.", () => {
      let crateState = {
        1: ["A", "B"],
        2: [],
      }

      let expectedState = {
        1: [],
        2: ["A", "B"]
      }

      expect(moveCrate(2, 1, 2)).toEqual(false);
      expect(rangeOverlapCheck(range2, range1)).toEqual(true);
    })
  })
})
