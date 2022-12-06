import * as jest from 'jest';
import { rangeOverlapCheck, Range, countContainedPairs, countOverlappedPairs } from '../cleaning_assignment';

describe('Cleaning Assignments', () => {

  describe('rangeOverlapCheck', () => {
    it("returns true if one range contain another.", () => {
      let range1: Range = {"start": 1, "end": 10}
      let range2: Range = { "start": 2, "end": 5 }

      expect(rangeOverlapCheck(range1, range2)).toEqual(false);
      expect(rangeOverlapCheck(range2, range1)).toEqual(true);
    })

    it("returns false if one range only partially overlaps another.", () => {
      let range1: Range = {"start": 1, "end": 10}
      let range2: Range = { "start": 8 , "end": 12 }

      expect(rangeOverlapCheck(range1, range2)).toEqual(true);

      let range3: Range = { "start": 1, "end": 8 }
      let range4: Range = { "start": 8, "end": 10 }

      expect(rangeOverlapCheck(range3, range4)).toEqual(true);
    })

    it("returns false if two ranges have no overlap.", () => {
      let range1: Range = {"start": 1, "end": 10}
      let range2: Range = { "start": 12 , "end": 20 }

      expect(rangeOverlapCheck(range1, range2)).toEqual(false);
    })

    it("returns true if two ranges have overlap on the edges.", () => {
      let range1: Range = {"start": 1, "end": 10}
      let range2: Range = { "start": 8 , "end": 10 }

      expect(rangeOverlapCheck(range1, range2)).toEqual(true);
    })
  })

  describe("part1 example", () => {
    it("satisfies exmaple for part 1", () => {
      let sampleInput = [
        "2-4,6-8",
        "2-3,4-5",
        "5-7,7-9",
        "2-8,3-7",
        "6-6,4-6",
        "2-6,4-8",
      ];

      expect(countContainedPairs(sampleInput)).toEqual(2);
    })
  })

  describe('rangeOverlapCheck', () => {
    it("returns true if one range contain another.", () => {
      let range1: Range = {"start": 1, "end": 10}
      let range2: Range = { "start": 2, "end": 5 }

      expect(rangeOverlapCheck(range1, range2)).toEqual(false);
      expect(rangeOverlapCheck(range2, range1)).toEqual(true);
    })

    it("returns false if one range only partially overlaps another.", () => {
      let range1: Range = {"start": 1, "end": 10 };
      let range2: Range = { "start": 8 , "end": 12 };

      expect(rangeOverlapCheck(range1, range2)).toEqual(true);
      expect(rangeOverlapCheck(range2, range1)).toEqual(true);
    })

    it("returns false if two ranges have no overlap.", () => {
      let range1: Range = {"start": 1, "end": 10}
      let range2: Range = { "start": 12 , "end": 20 }

      expect(rangeOverlapCheck(range1, range2)).toEqual(false);
    })

    it("returns true if two ranges have overlap on the edges.", () => {
      let range1: Range = {"start": 1, "end": 10}
      let range2: Range = { "start": 8 , "end": 10 }

      expect(rangeOverlapCheck(range1, range2)).toEqual(true);
    })
  })

  describe("part2 example", () => {
    it("satisfies exmaple for part 2", () => {
      let sampleInput = [
        "2-4,6-8",
        "2-3,4-5",
        "5-7,7-9",
        "2-8,3-7",
        "6-6,4-6",
        "2-6,4-8",
      ];

      expect(countOverlappedPairs(sampleInput)).toEqual(4);
    })
  })
})
