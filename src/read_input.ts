import * as readline from 'node:readline';
import * as fs from 'node:fs';
import * as process from 'node:process';
import * as path from 'node:path';
import * as _ from 'lodash';

type ProcessingFunction = (inputs: Array<string>) => void;
type AocInputReader = (nputDir: string, fileName: string, processingFunction: ProcessingFunction) => Promise<void>;

const readAocInput: AocInputReader = async (inputDir: string, fileName: string, processingFunction: ProcessingFunction) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(path.resolve(inputDir, fileName)),
    crlfDelay: Infinity,
  });

  let lines: Array<string> = [];

  rl.on('line', (line: string) => {
    lines.push(line);
  });

  await new Promise((_res) => rl.once('close', function () {
    processingFunction(lines)
  }));

  console.log(`Used ${process.memoryUsage().heapUsed / 1024 / 1024} MB`);
  console.timeEnd('Time');
}

export default readAocInput;
