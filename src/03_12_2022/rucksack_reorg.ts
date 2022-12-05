import readAocInput from "../read_input";
import _ from 'lodash';
import pipe from 'lodash/fp/pipe';
import map from 'lodash/fp/map';
import sum from 'lodash/fp/sum';
import last from 'lodash/fp/last';
import all from 'lodash/fp/all';
import chunk from 'lodash/fp/chunk';

type FrequencyTable = { [key: string]: number };
type PriorityConfig = FrequencyTable;

export const findDupsFromList = (lists: Array<Array<string>>): string | undefined => {
  const buildDictionary = (list: Array<string>): FrequencyTable => {
    let i = 0;
    let leftItems: {[key: string]: number } = {};
    while (i < list.length) {
      let char = list[i];
      leftItems[char] = 1;
      i += 1;
    }

    return leftItems;
  }

  const dictionaries: Array<FrequencyTable> = map(buildDictionary)(lists);
  return last(
      Object.keys(last(dictionaries) as object)
            .filter((char) => all((dic) => !!dic[char], dictionaries))
    );
}

export const duplicateItemFinder = (itemList: string) => {
  let total: number = itemList.length;
  if ((total % 2) != 0) {
    throw new Error(`Invalid rucksack. Odd number of items.`)
  }

  let items: Array<string> = Array.from(itemList);

  let half: number = total / 2;
  let left: Array<string> = items.slice(0, half);
  let right: Array<string> = items.slice(half)
  return findDupsFromList([left, right]);
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
  return pipe(duplicateItemFinder, scoreItemPriority)(line);
}

export const calculateTotalScore = (lines: Array<string>) => {
  return pipe(
    map(calculateScore),
    sum
  )(lines)
}

export const badgeScoreFinder = (lines: Array<string>) => {
  return pipe(
    map(Array.from),
    chunk(3),
    map(findDupsFromList),
    map(scoreItemPriority),
    sum
  )(lines)
}

if (require.main === module) {
  readAocInput(__dirname, "input1.txt", (lines: Array<string>) => {
    console.log(`Total score for part 1 is: ${calculateTotalScore(lines)}`)
  })

  readAocInput(__dirname, "input1.txt", (lines: Array<string>) => {
    console.log(`Total score for part 2 is: ${badgeScoreFinder(lines)}`)
  })
}
