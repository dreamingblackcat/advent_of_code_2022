import * as readline from 'node:readline';
import * as fs from 'node:fs';
import * as process from 'node:process';
import * as path from 'node:path';
import * as _ from 'lodash';

enum Selection {
  Rock = 1,
  Paper = 2,
  Scissors = 3,
}

type SelectionConfig = {
  win: Selection,
  lose: Selection,
}

type GameConfig = {
  [key in Selection]: SelectionConfig
}

const normalizeSelection = (selection: string): Selection => {
  switch (selection) {
    case 'A':
      return Selection.Rock;
    case 'B':
      return Selection.Paper;
    case 'C':
      return Selection.Scissors;
    case 'X':
      return Selection.Rock;
    case 'Y':
      return Selection.Paper;
    case 'Z':
      return Selection.Scissors;
    default:
      // Should never get here but statisfying type checker
      return Selection.Scissors;
  }
}

const calculateScore = (enemySelection: Selection, yourSelection: Selection): Number => {
  let config: GameConfig = {
    [Selection.Rock]: {
      win: Selection.Scissors,
      lose: Selection.Paper,
    },
    [Selection.Paper]: {
      win: Selection.Rock,
      lose: Selection.Scissors,
    },
    [Selection.Scissors]: {
      win: Selection.Paper,
      lose: Selection.Rock,
    },
  }

  let enemyConfig = config[enemySelection];
  if (!enemyConfig) {
    throw new Error(`Invalid enemy selection ${enemySelection}`);
  }

  if (enemySelection === yourSelection) {
    return yourSelection + 3;
  }

  if (enemyConfig.win == yourSelection) {
    return yourSelection;
  }

  return yourSelection + 6;
}


void (async () => {
  const rl = readline.createInterface({
    input: fs.createReadStream(path.resolve(__dirname, 'input1.txt')),
    crlfDelay: Infinity,
  });

  let scores: Array<Number> = [];

  rl.on('line', (line) => {
    let [enemy, you]: Array<string> = line.split(" ");
    let enemySelection = normalizeSelection(enemy);
    let yourSelection = normalizeSelection(you);

    scores.push(calculateScore(enemySelection, yourSelection));
  });

  await new Promise((res) => rl.once('close', function () {
    let totalScores = _.sum(scores)
    console.log(`Total score is ${totalScores}`);
  }));

  console.log(`Used ${process.memoryUsage().heapUsed / 1024 / 1024} MB`);
  console.timeEnd('Time');
})();
