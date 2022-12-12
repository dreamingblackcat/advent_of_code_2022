import * as jest from 'jest';
import { findSignalStartAt, findMessageStartAt } from '../tuning_trouble';

describe("Tuning trouble", () => {

  describe('findSignalStartAt', () => {
    it("finds the start of the signal start.", () => {
      let signals = [
        { signal: "bvwbjplbgvbhsrlpgdmjqwftvncz", correctIndex: 5 },
        { signal: "nppdvjthqldpwncqszvftbrmjlhg", correctIndex: 6 },
        { signal: "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", correctIndex: 10 },
        { signal: "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", correctIndex: 11 }
      ];

      signals.forEach((testCase) => {
        expect(findSignalStartAt(testCase.signal)).toEqual(testCase.correctIndex);
      })

    })
  })

  describe('findMessageStartAt', () => {
    it("finds the start of the message start.", () => {
      let signals = [
        { signal: "mjqjpqmgbljsphdztnvjfqwrcgsmlb", correctIndex: 19 },
        { signal: "bvwbjplbgvbhsrlpgdmjqwftvncz", correctIndex: 23 },
        { signal: "nppdvjthqldpwncqszvftbrmjlhg", correctIndex: 23 },
        { signal: "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", correctIndex: 29 },
        { signal: "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", correctIndex: 26 }
      ];

      signals.forEach((testCase) => {
        expect(findMessageStartAt(testCase.signal)).toEqual(testCase.correctIndex);
      })

    })
  })
})
