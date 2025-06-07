const fs = require("fs");
const path = require("path");

let projects = [".", "server", "client"];

const clean = (args) => {
  if (args.length > 0) {
    projects = args;
  }

  projects.forEach((project) => {
    const dir = path.resolve(__dirname, "..", project);

    try {
      console.log(`🧹 Cleaning ${project === "." ? "root" : project}...`);

      const nodeModulesPath = path.join(dir, "node_modules");
      const lockFilePath = path.join(dir, "package-lock.json");

      if (fs.existsSync(nodeModulesPath)) {
        fs.rmSync(nodeModulesPath, { recursive: true, force: true });
        console.log(`     ✔ Removed node_modules`);
      } else console.log(`     ✔ No node_modules found`);

      if (fs.existsSync(lockFilePath)) {
        fs.rmSync(lockFilePath, { force: true });
        console.log(`     ✔ Removed package-lock.json\n`);
      } else console.log(`     ✔ No package-lock.json found\n`);
    } catch (error) {
      console.error(`    ❌ Error cleaning ${project} \n       ${error.message}\n`);
    }
  });
};

module.exports = { clean };