import readAocInput from "../read_input";
import _ from 'lodash';
import pipe from 'lodash/fp/pipe';
import map from 'lodash/fp/map';
import sum from 'lodash/fp/sum';

type PriorityConfig = { [key: string]: number };

export const duplicateFinder = (itemList: string) => {
  let total: number = itemList.length;
  if ((total % 2) != 0) {
    throw new Error(`Invalid rucksack. Odd number of items.`)
  }

  let items: Array<string> = Array.from(itemList);

  let half: number = total / 2;
  let left: Array<string> = items.slice(0, half);
  let right: Array<string> = items.slice(half)

  let i = 0;
  let leftItems: {[key: string]: number } = {};
  while (i < left.length) {
    let char = left[i];
    leftItems[char] = 1;
    i += 1;
  }

  let dup = undefined;
  i = 0
  while (i < right.length) {
    let char = right[i];
    if (leftItems[char]) {
      dup = char;
      break;
    }
    i += 1;
  }

  return dup;
}

const LowerCasePriorityConfig: PriorityConfig = _.range(1, 27).reduce((hash, i) => {
      return { ...hash, [String.fromCharCode(96 + i)]: i };
  }, {})

const UpperCasePriorityConfig: PriorityConfig = _.range(27, 53).reduce((hash, i) => {
    return { ...hash, [String.fromCharCode(64 + (i - 26))]: i };
  }, {})

export const scoreItemPriority: (item: string) => number = (item: string): number => {
  let charCode = item.charCodeAt(0);
  if (charCode >= 'a'.charCodeAt(0)) {
    return LowerCasePriorityConfig[item];
  } else {
    return UpperCasePriorityConfig[item];
  }
}

export const calculateScore = (line: string): number => {
  return pipe(duplicateFinder, scoreItemPriority)(line);
}

export const calculateTotalScore = (lines: Array<string>) => {
  //return sum(map(calculateScore, lines))
  return pipe(map(calculateScore), sum)(lines)
}


if (require.main === module) {
  console.log("Running me directly.")
  readAocInput(__dirname, "input1.txt", (lines: Array<string>) => {
    console.log(`Total score for part 1 is: ${calculateTotalScore(lines)}`)
  })
}
