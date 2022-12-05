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

enum Strategy {
  Lose = 'X',
  Draw = 'Y',
  Win  = 'Z',
}

type SelectionConfig = {
  [key in Strategy]: Selection
}

type GameConfig = {
  [key in Selection]: SelectionConfig
}

const config: GameConfig = {
  [Selection.Rock]: {
    [Strategy.Lose]: Selection.Paper,
    [Strategy.Draw]: Selection.Rock,
    [Strategy.Win]: Selection.Scissors,
  },
  [Selection.Paper]: {
    [Strategy.Lose]: Selection.Scissors,
    [Strategy.Draw]: Selection.Paper,
    [Strategy.Win]: Selection.Rock,
  },
  [Selection.Scissors]: {
    [Strategy.Lose]: Selection.Rock,
    [Strategy.Draw]: Selection.Scissors,
    [Strategy.Win]: Selection.Paper,
  },
}

const normalizeSelection = (selection: string): Selection => {
  switch (selection) {
    case 'A':
      return Selection.Rock;
    case 'B':
      return Selection.Paper;
    case 'C':
      return Selection.Scissors;
    default:
      throw new Error(`Invalid selection ${selection}`);
  }
}

const normalizeStrategy = (strategy: string): Strategy => {
  switch (strategy) {
    case 'X':
      return Strategy.Lose;
    case 'Y':
      return Strategy.Draw;
    case 'Z':
      return Strategy.Win;
    default:
      throw new Error(`Invalid strategy to normalize ${strategy}`);
  }
}

const selectByStrategy = (strategy: Strategy, enemySelection: Selection): Selection => {
  switch (strategy) {
    case Strategy.Lose:
      return config[enemySelection][Strategy.Win];
    case Strategy.Draw:
      return config[enemySelection][Strategy.Draw];

    case Strategy.Win:
      return config[enemySelection][Strategy.Lose];

    default:
      throw new Error(`Invalid strategy ${strategy}`);
  }
}

const calculateScore = (enemySelection: Selection, yourStrategy: Strategy): Number => {
  let yourSelection = selectByStrategy(yourStrategy, enemySelection);
  let score = 0;
  switch(yourStrategy) {
    case Strategy.Lose:
      score = 0 + yourSelection;
      break;
    case Strategy.Draw:
      score = 3 + yourSelection;
      break;
    case Strategy.Win:
      score = 6 + yourSelection;
      break;
    default:
      throw new Error(`Invalid strategy config ${yourStrategy}`);
  }
  return score;
}


void (async () => {
  const rl = readline.createInterface({
    input: fs.createReadStream(path.resolve(__dirname, 'input1.txt')),
    crlfDelay: Infinity,
  });

  let scores: Array<Number> = [];

  rl.on('line', (line) => {
    let [enemyChoice, yourStrat]: Array<string> = line.split(" ");
    let enemySelection = normalizeSelection(enemyChoice);
    let yourStrategy = normalizeStrategy(yourStrat);

    scores.push(calculateScore(enemySelection, yourStrategy));
  });

  await new Promise((_res) => rl.once('close', function () {
    let totalScores = _.sum(scores)
    console.log(`Total score is ${totalScores}`);
  }));

  console.log(`Used ${process.memoryUsage().heapUsed / 1024 / 1024} MB`);
  console.timeEnd('Time');
})();
