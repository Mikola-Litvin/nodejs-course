const mycli = require('commander');
const { pipeline } = require('stream');
const fs = require('fs');
const DIR_PATH = './task1/';
let isFile;

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

  const encodeToRot13 = (str) => {
    const str1 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const str2 = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';
    const arr = [];
    for (let i = 0; i < str.length; i += 1) {
      const index = str1.indexOf(str[i]);
      arr.push(str2[index]);
    }
    return arr.join('');
  }

mycli.parse(process.argv)
