import take from 'lodash/fp/take';
import takeRight from 'lodash/fp/takeRight';
import chunk from 'lodash/fp/chunk';
import reduce from 'lodash/fp/reduce';
import last from 'lodash/fp/last';
import reverse from 'lodash/fp/reverse';
import pipe from 'lodash/fp/pipe';
import map from 'lodash/fp/map';
import unzip from 'lodash/fp/unzip';
import compact from 'lodash/fp/compact';

import readAocInput from '../read_input';

export type MoveInstruction = {
  from: number,
  to: number,
  crates: number,
};

export type State = {
  [key: number]: string[],
};

export enum MovingStrategy {
  ONE_BY_ONE = 1,
  MUTLIPLE_AT_ONCE = 2
}

export const parseState = (stateLines: string[]): State => {
  // TODO: implement a limited parser here later.
  let stacksCount = pipe(
    last,
    chunk(4),
    last,
    (str: string[]) => Number(str[1])
  )(stateLines)

  let extractItem = (line: string) => {
    return pipe(
      chunk(4),
      map((chunks) => chunks[1]),
    )(line)
  };

  let items = pipe(
    map(extractItem),//only get item inside the boxes [X] -> 'X'
    unzip, // lodash unzip transpose an array
    map((ary) => ary.filter(item => item != ' ')),// transpose array is not properly compacted, so compacting here
    map(reverse), // And each array from the transposed row is in reverse order. So, filpping them back.
    map(compact) // And each array from the transposed row is in reverse order. So, filpping them back.
  )(stateLines)
  let state: State = {};
  items.map((ary, idx) => {
    state[idx+1] = ary
  })
  return state;
};

const parseInstructions = (instructionLines: string[]): MoveInstruction[] => {
  let ins: Array<MoveInstruction | null> = map((line: string) => {
    let match = line.match(/move (\d+) from (\d+) to (\d+)/);
    if (match) {
      return {
        crates: Number(match[1]),
        from: Number(match[2]),
        to: Number(match[3]),
      }
    } else {
      return null;
    };
  })(instructionLines);

  return compact(ins);
}


export const moveCrate = (strategy: MovingStrategy = MovingStrategy.ONE_BY_ONE, state: State, instruction: MoveInstruction): State => {
  let fromList = state[instruction.from];
  let toList = state[instruction.to];

  let cratesToMove = takeRight(instruction.crates)(fromList);
  if (strategy == MovingStrategy.ONE_BY_ONE) {
    cratesToMove = reverse(cratesToMove);
  }

  let newState = {
    ...state,
    [instruction.from]: take(fromList.length - instruction.crates)(fromList),
    [instruction.to]: toList.concat(cratesToMove),
  }

  return newState;
}

const debug = (func: (...args: any[]) => any) => {
  return (...args: any[]) => {
    console.log("Arguments:", args);
    let result = func.apply(null, args);
    console.log("Result:", result);
    return result;
  }
}

export const runInstructions = (strategy: MovingStrategy = MovingStrategy.ONE_BY_ONE, state: State, instructions: MoveInstruction[]): State => {
  return reduce(moveCrate.bind(null, strategy))(state)(instructions);
}

//[N]         [C]     [Z]
//[Q] [G]     [V]     [S]         [V]
//[L] [C]     [M]     [T]     [W] [L]
//[S] [H]     [L]     [C] [D] [H] [S]
//[C] [V] [F] [D]     [D] [B] [Q] [F]
//[Z] [T] [Z] [T] [C] [J] [G] [S] [Q]
//[P] [P] [C] [W] [W] [F] [W] [J] [C]
//[T] [L] [D] [G] [P] [P] [V] [N] [R]
// 1   2   3   4   5   6   7   8   9
const input1State = {

}


if (require.main === module) {
  readAocInput(__dirname, "input1.txt", (lines: Array<string>) => {
    let stateLines = lines.filter(line => line.match(/\[/))
    let initialState = parseState(stateLines);
    const ins = parseInstructions(lines);
    console.log(ins)
    console.log(initialState)

    const message1 = Object.values(runInstructions(MovingStrategy.ONE_BY_ONE, initialState, ins)).map(ary => last(ary)).join("")
    const message2 = Object.values(runInstructions(MovingStrategy.MUTLIPLE_AT_ONCE, initialState, ins)).map(ary => last(ary)).join("")

    console.log(`Part 1: Message for the elves: ${message1}`)
    console.log(`Part 1: Message for the elves: ${message2}`)
  })

}
