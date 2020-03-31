const mycli = require('commander');
const { pipeline, Transform } = require('stream');
const fs = require('fs');
const DIR_PATH = './task1/';

const ceaserCipher = (str) => {
  const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
  const arr = [];
  for (let i = 0; i < str.length; i += 1) {
    if (upperCase.indexOf(str[i]) !== -1 || lowerCase.indexOf(str[i]) !== -1) {
      let index = (upperCase.indexOf(str[i]) !== -1) ? upperCase.indexOf(str[i]) : lowerCase.indexOf(str[i]);
      if (mycli.actions === 'encode') {
        index = (index + Number(mycli.shift)) % 26;
      } else if (mycli.actions === 'decode') {
        index = (index - Number(mycli.shift)) % 26;
      } else {
        arr.push(str[i]);
      }
      (upperCase.indexOf(str[i]) !== -1) ? arr.push(upperCase[index]) : arr.push(lowerCase[index]);
    } else {
      arr.push(str[i]);
    }
  }
  return arr.join('');
}

const cipher = new Transform({
  transform(chunk, encoding, callback) {
    let resultString = chunk.toString();
    resultString = ceaserCipher(resultString);
    callback(null, resultString);
  }
})

mycli
  .option('-s, --shift <shift>', `a shift`)
  .option('-a, --actions <action>', `an action encode/decode`)
  .option('-i, --input [file]', `an input file`)
  .option('-o, --output [file]', `an output file`)
  .action(() => {
    if (!mycli.silent) {
      if (!mycli.shift || !mycli.actions) {
        process.stderr.write("You should pass all mandatory parameters\n");
      } else {
        let inpt;
        let outpt;
        if (!mycli.input) {
          inpt = process.stdin;
        } else {
          inpt = fs.createReadStream(`${DIR_PATH}${mycli.input}`);
          inpt.on(
            'error',
            () => {
              process.stderr.write(`${mycli.input} does not exist.\n`);
            }
          )
        }
        if (!mycli.output) {
          outpt = process.stdout;
        } else {
          outpt = fs.createWriteStream(`${DIR_PATH}${mycli.output}`);
        }
        pipeline(
          inpt,
          cipher,
          outpt,
          (err) => {
            if (err) {
              return
            } 
          }
        );
      }
    }
  })

mycli.parse(process.argv)
