#!/usr/bin/env node
import program from 'commander';
import fs from 'fs';
import { prompt } from 'inquirer';
import { rootDir } from '../Helper';
program
  .version('1.0.0')
  .description('riverExpress');

const questions = [
  {
    type: 'input',
    name: 'port',
    message: 'Enter app port ...',
  },
  {
    type: 'input',
    name: 'name',
    message: 'Enter app name ...',
  },
  {
    type: 'input',
    name: 'key',
    message: 'Enter app key ...',
  },
  {
    type: 'input',
    name: 'db',
    message: 'Enter database name ...',
  },
  {
    type: 'input',
    name: 'timeout',
    message: 'Enter timeout (in second) ...',
  },
];

program
  .command('run')
  .alias('r')
  .description('Configure Common Variable')
  .action(() => {
    prompt(questions).then((answers) => {
      const envPath = `${rootDir}/.env.development`;

      if (fs.existsSync(envPath)) {
        fs.unlinkSync(envPath);
      }
      const data = `NODE_ENV=development \n\nAPP_URL=http://localhost/${answers.port} \nAPP_PORT=${answers.port}\nAPP_NAME=${answers.name} \nAPP_KEY=${answers.key} \n\nMONGODB_URL=mongodb://127.0.0.1/${answers.db} \n\nTIMEOUT_PERIOD=${answers.timeout}s`;

      fs.writeFileSync(envPath, data);
    });
  });

program.parse(process.argv);