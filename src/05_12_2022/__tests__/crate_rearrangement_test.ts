import * as jest from 'jest';
import { moveCrate, MoveInstruction, State, parseState, runInstructions, MovingStrategy  } from '../crate_rearrangement';

describe('Crate rearrangements', () => {

  describe('moveCrate', () => {
    it("updates crate state with part 1 strategy.", () => {
      let crateState: State = {
        1: ["A", "B"],
        2: [],
      }

      let expectedState: State = {
        1: [],
        2: ["B", "A"]
      }

      let instruction1: MoveInstruction = {
        from: 1,
        to: 2,
        crates: 2,
      }

      expect(moveCrate(MovingStrategy.ONE_BY_ONE, crateState, instruction1)).toMatchObject(expectedState);
    })

     it("updates crate state with part 2 strategy.", () => {
      let crateState: State = {
        1: ["A", "B"],
        2: [],
      }

      let expectedState: State = {
        1: [],
        2: ["A", "B"]
      }

      let instruction1: MoveInstruction = {
        from: 1,
        to: 2,
        crates: 2,
      }

      expect(moveCrate(MovingStrategy.MUTLIPLE_AT_ONCE, crateState, instruction1)).toMatchObject(expectedState);
    })
  })

  describe('runInstructions', () => {
    it("produces sample input answer correctly for part 1.", () => {
      let sampleState = {
          1: ["Z", "N"],
          2: ["M", "C", "D"],
          3: ["P"]
      }
      //move 1 from 2 to 1
      //move 3 from 1 to 3
      //move 2 from 2 to 1
      //move 1 from 1 to 2
      let instructions = [
        { crates: 1, from: 2, to: 1 },
        { crates: 3, from: 1, to: 3},
        { crates: 2, from: 2, to: 1},
        { crates: 1, from: 1, to: 2},
      ]

      expect(runInstructions(MovingStrategy.ONE_BY_ONE, sampleState, instructions)).toMatchObject(
        {
          1: ["C"],
          2: ["M"],
          3: ["P", "D", "N", "Z"]
        }
      )
    })

    it("produces sample input answer correctly for part 1.", () => {
      let sampleState = {
          1: ["Z", "N"],
          2: ["M", "C", "D"],
          3: ["P"]
      }
      //move 1 from 2 to 1
      //move 3 from 1 to 3
      //move 2 from 2 to 1
      //move 1 from 1 to 2
      let instructions = [
        { crates: 1, from: 2, to: 1 },
        { crates: 3, from: 1, to: 3},
        { crates: 2, from: 2, to: 1},
        { crates: 1, from: 1, to: 2},
      ]

      expect(runInstructions(MovingStrategy.MUTLIPLE_AT_ONCE, sampleState, instructions)).toMatchObject(
        {
          1: ["M"],
          2: ["C"],
          3: ["P", "Z", "N", "D"]
        }
      )
    })
  })

  describe('parseState', () => {
    it("parses sample input correctly.", () => {
      let sampleInput = [
        "[D]        ",
        "[N] [C]    ",
        "[Z] [M] [P]",
      ];

      expect(parseState(sampleInput)).toMatchObject(
        {
          1: ["Z", "N", "D"],
          2: ["M", "C"],
          3: ["P"]
        }
      )
    })
  })
})
