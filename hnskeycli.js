#!/usr/bin/env node
/**
 * hnskeycli
 * Simple CLI tool to generate and encrypt priv/pub keys
 */

'use strict';

const readline = require('readline');
const bMonic = require('./bmonic')
const filename = 'HandShakeSeed.enc'
const bmonic = new bMonic({lang: 'english'})



console.log('Usage: ./cli');
console.log('PSA: Do not run on potentially compromised hardware.');
console.log('The truely parandoid can run on an air-gapped machine.');
console.log("\n");
console.log('First output will be a new secret key phrase which you must backup and keep secret.') 
console.log('Second output will be your address, which can be shared.');
console.log('You MUST write down your key. This tool does not create any backup')
console.log("\n");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const prompt = 'Press return to generate a new Mnemonic seed phrase:\n';

// Handles hidden password input
const stdin = process.openStdin();
process.stdin.on('data', (char) => {
  console.log("\n");
  char = char + "";
  switch (char) {
    case "\n":
    case "\r":
    case "\u0004":
      stdin.pause();
      break;
    default:
      process.stdout.write('\x1B[2K\x1B[200D' + prompt +
        Array(rl.line.length + 1).join('*'));
      break;
  }
});

rl.question(prompt, (prompt) => {
  console.log('Generating Key...');
  console.log("\n");
  const key = bmonic.newKey()
  const phrase = Buffer.from(key.phrase)

  console.log('Seed phrase (WRITE DOWN AND KEEP SECRET)');
  console.log(phrase.toString());
  console.log("\n");
  console.log('Address (SHARE THIS):');
  console.log(key.address)
  console.log("\n");
  console.log('You MUST write down your key. This tool did not create any backup')
  console.log('exiting...')
  process.exit(0);
  console.error(e.stack);
  process.exit(1);
});
