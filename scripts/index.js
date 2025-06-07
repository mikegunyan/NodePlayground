const { test } = require("./test");
const { load } = require("./load");
const { clean } = require("./clean");
const { dev } = require("./dev");

const args = process.argv.slice(2);
const action = args[0];
const passedArgs = args.slice(1);

if (action === "test") test(passedArgs);
else if (action === "load") load(passedArgs);
else if (action === "clean") clean(passedArgs);
else if (action === "dev") dev(passedArgs);
else console.log("Invalid action. Use: node scripts/index.js test");
 