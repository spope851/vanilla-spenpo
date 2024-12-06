const { exec } = require("child_process");

exec("rsync -avz ./src/*.html dist", (err, stdout, stderr) => {
  if (err) {
    console.error(`Error: ${stderr}`);
    process.exit(1);
  }
  console.log(`Output: ${stdout}`);
});

exec("cp ./favicon.ico dist/favicon.ico", (err, stdout, stderr) => {
  if (err) {
    console.error(`Error: ${stderr}`);
    process.exit(1);
  }
  console.log(`Output: ${stdout}`);
});