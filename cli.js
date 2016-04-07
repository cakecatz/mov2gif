#!/usr/bin/env node

const path = require('path');
const argv = require('yargs')
  .usage('Usage: mov2gif [options] <inputfile>')
  .option('optimize', {
    describe: 'Optimization level',
    default: 1,
  })
  .option('output-file', {
    alias: ['o'],
    describe: 'Converted gif file',
  })
  .option('frame', {
    alias: ['f'],
    describe: 'frame',
    default: 24,
  })
  .option('delay', {
    describe: 'Set the delay between frames to time in hundredths of a second. ',
    default: 3,
  })
  .demand(1, 2, '')
  .help('help')
  .argv;

const converter = require('./lib').default;
const inputFile = argv._[0];
const defaultOutput = `${path.dirname(inputFile)}/${path.basename(inputFile, '.mov')}.gif`;
const outputFile = argv._[1] || argv['output-file'] || defaultOutput;

converter(inputFile, outputFile, {
  optimize: argv.optimize,
  frame: argv.frame,
  delay: argv.delay,
});
