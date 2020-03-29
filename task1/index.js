const mycli = require('commander')

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
        console.log(mycli.shift);
        console.log(mycli.actions);
      }
    }
  })

mycli.parse(process.argv)
