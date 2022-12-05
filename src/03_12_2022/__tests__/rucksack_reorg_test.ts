import * as jest from 'jest';
import { duplicateItemFinder, scoreItemPriority, calculateScore, calculateTotalScore, badgeScoreFinder } from '../rucksack_reorg';

describe('Rusack Reorg', () => {

  describe('duplicateItemFinder', () => {
    it("returns undefined if no duplicate between compartments.", () => {
      var itemList = "abcdef";
      const dup = duplicateItemFinder(itemList);
      expect(dup).toBeUndefined();
    })

    it("returns correct duplicate item when input is sound.", () => {
      var itemList = "abcdec";
      const dup = duplicateItemFinder(itemList);
      expect(dup).toEqual('c');
    })

  })

  describe('scoreItemPriority', () => {

    it("returns correct prirority for lower case values", () => {
      expect(scoreItemPriority('a')).toEqual(1);
      expect(scoreItemPriority('z')).toEqual(26);
    })

    it("returns correct prirority for upper case values", () => {
      expect(scoreItemPriority('A')).toEqual(27);
      expect(scoreItemPriority('Z')).toEqual(52);
    })

  })

  describe("calculateScore", () => {
    it("calculate scores by duplicate item.", () => {
      expect(calculateScore("vJrwpWtwJgWrhcsFMMfFFhFp")).toEqual(16);
      expect(calculateScore("jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL")).toEqual(38);
    })
  })

  describe("calculateTotalScore", () => {
    it("statisfies example", () => {
      let lines = [
        "vJrwpWtwJgWrhcsFMMfFFhFp",
        "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
        "PmmdzqPrVvPwwTWBwg",
        "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
        "ttgJtRGJQctTZtZT",
        "CrZsJsPPZsGzwwsLwLmpwMDw",
      ]

      expect(calculateTotalScore(lines)).toEqual(157);
    })
  })

  describe("badgeScoreFinder", () => {
    it("satisfies part 2 example.", () => {
      let lines = [
        "vJrwpWtwJgWrhcsFMMfFFhFp",
        "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
        "PmmdzqPrVvPwwTWBwg",
        "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
        "ttgJtRGJQctTZtZT",
        "CrZsJsPPZsGzwwsLwLmpwMDw",
      ];

      expect(badgeScoreFinder(lines)).toEqual(70);
    })
  })

})
