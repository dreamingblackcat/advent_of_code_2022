
import first from 'lodash/fp/first';

import readAocInput from '../read_input';

const distinctCharMatcher = (distinctCharsCount: number): (signal: string, currentMatch: string, currentIndex: number) => number => {
  const finder = (signal: string, currentMatch: string, currentIndex: number): number => {
    if (currentIndex >= signal.length || signal.length <= distinctCharsCount) {
      return -1;
    }

    let currentChar = signal[currentIndex];

    let pastOccurredIndex = currentMatch.indexOf(currentChar);
    if (pastOccurredIndex == -1) {
      if (currentMatch.length < distinctCharsCount-1) {
        return finder(signal, currentMatch.concat(currentChar), currentIndex + 1);
      } else {
        return currentIndex+1;
      }
    } else {
      return finder(signal, currentMatch.slice(pastOccurredIndex + 1, distinctCharsCount-1).concat(currentChar), currentIndex + 1);
    }
  }

  return finder;
}

const packetFinder = distinctCharMatcher(4);
const messageFinder = distinctCharMatcher(14);

export const findSignalStartAt = (signal: string): number => {
  return packetFinder(signal, '', 0);
}

export const findMessageStartAt = (signal: string): number => {
  return messageFinder(signal, '', 0);
}


if (require.main === module) {
  readAocInput(__dirname, "input1.txt", (lines: Array<string>) => {

    let dataStream: string = first(lines) || '';

    console.log(`Part 1: Signal start is at: ${findSignalStartAt(dataStream)}`)
    console.log(`Part 2: Signal start is at: ${findMessageStartAt(dataStream)}`)
  })
}
