import * as readline from 'node:readline';
import * as fs from 'node:fs';
import * as process from 'node:process';
import * as path from 'node:path';
import _ from 'lodash';

void (async () => {
  const rl = readline.createInterface({
    input: fs.createReadStream(path.resolve(__dirname, 'input1.txt')),
    crlfDelay: Infinity,
  });

  let currentTotal = 0;
  let values: number[] = [];
  rl.on('line', (line) => {
    let match = line.match(/(\d+)/);
    if (match) {
      console.log('Number');
      currentTotal += Number(match[0]);
    } else {
      console.log('space');
      values.push(currentTotal);
      currentTotal = 0;
    }
  });


  await new Promise((res) => rl.once('close', function () {
    console.log(values)
    var top3 = _.chain(values).sortBy().reverse().take(3).sum().value();
    console.log(`Max value is ${top3}`);
  }));

  console.log(`Used ${process.memoryUsage().heapUsed / 1024 / 1024} MB`);
  console.timeEnd('Time');
})();
