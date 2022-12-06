
import readAocInput from "../read_input";
import map from 'lodash/fp/map';
import pipe from 'lodash/fp/pipe';
import filter from 'lodash/fp/filter';
import reduce from 'lodash/fp/reduce';

export type Range = {
  start: number,
  end: number
}

export const rangeContainmentCheck = (range1: Range, range2: Range): boolean => {
  if (range1.start >= range2.start && range1.end <= range2.end) {
    return true;
  }

  if (range2.start >= range1.start && range2.end <= range1.end) {
    return true;
  }

  return false;
}

export const rangeOverlapCheck = (range1: Range, range2: Range): boolean => {
  if (range1.start >= range2.start && range1.start <= range2.end || range1.end >= range2.start && range1.end <= range2.end) {
    return true;
  }

  return false;
}


export const countContainedPairs = (lines: string[]): number => {
  return pipe(
    map((line: string): Range[] => {
      let [range1, range2] = line.split(",");
      let [start1, end1] = range1.split("-")
      let [start2, end2] = range2.split("-")
      return [
        { start: Number(start1), end: Number(end1) },
        { start: Number(start2), end: Number(end2) },
      ];
    }),
    filter(([range1, range2]: Range[]) => rangeContainmentCheck(range1, range2)),
    reduce((count: number, _item: any) => count + 1)(0)
  )(lines);
}


export const countOverlappedPairs = (lines: string[]): number => {
  return pipe(
    map((line: string): Range[] => {
      let [range1, range2] = line.split(",");
      let [start1, end1] = range1.split("-")
      let [start2, end2] = range2.split("-")
      return [
        { start: Number(start1), end: Number(end1) },
        { start: Number(start2), end: Number(end2) },
      ];
    }),
    filter(([range1, range2]: Range[]) => rangeOverlapCheck(range1, range2) || rangeOverlapCheck(range2, range1)),
    reduce((count: number, _item: any) => count + 1)(0)
  )(lines);
}


if (require.main === module) {
  readAocInput(__dirname, "input1.txt", (lines: string[]) => {
    let containedPairs = countContainedPairs(lines);
    let overlappedPairs = countOverlappedPairs(lines);
    console.log(`Total contained pairs for part 1 is: ${containedPairs}`)
    console.log(`Total overlapped pairs for part 2 is: ${overlappedPairs}`)
  })

  //readAocInput(__dirname, "input1.txt", (lines: Array<string>) => {
  //  console.log(`Total score for part 2 is: ${badgeScoreFinder(lines)}`)
  //})
}
