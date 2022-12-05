import * as readline from 'node:readline';
import * as fs from 'node:fs';
import * as process from 'node:process';
import * as path from 'node:path';

void (async () => {
  const rl = readline.createInterface({
    input: fs.createReadStream(path.resolve(__dirname, 'input1.txt')),
    crlfDelay: Infinity,
  });

  let max = 0;
  let currentTotal = 0;
  rl.on('line', (line) => {
    let match = line.match(/(\d+)/);
    if (match) {
      console.log('Number');
      currentTotal += Number(match[0]);
    } else {
      console.log('space');
      if (currentTotal > max) {
        max = currentTotal;
      }
      currentTotal = 0;
    }
  });

  await new Promise((res) => rl.once('close', function () {
    console.log(`Max value is ${max}`);
  }));

  console.log(`Used ${process.memoryUsage().heapUsed / 1024 / 1024} MB`);
  console.timeEnd('Time');
})();
