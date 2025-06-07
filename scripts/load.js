const { execSync } = require("child_process");

let projects = ["server", "client"];

const load = (args) => {
  const dependencies = [];
  const devDependencies = [];
  const projectArgs = [];

  // Parse CLI arguments
  args.forEach((arg) => {
    if (arg.startsWith("d=")) dependencies.push(...arg.split("=")[1].split(","));
    else if (arg.startsWith("D=")) devDependencies.push(...arg.split("=")[1].split(","));
    else projectArgs.push(arg);
  });

  if (projectArgs.length > 0) projects = projectArgs;

  projects.forEach((project) => {
    const label = project === "." ? "root" : project;
    const cwd = `./${project}`;

    try {
      console.log(`📦 Loading dependencies into ${label}...`);

      if (dependencies.length > 0) {
        const installCmd = `npm install --silent ${dependencies.join(" ")}`;
        execSync(installCmd, { stdio: "inherit", cwd });
        console.log(`     ✔ Installed dependencies: ${dependencies.join(", ")}`);
      }

      if (devDependencies.length > 0) {
        const devInstallCmd = `npm install --silent --save-dev ${devDependencies.join(" ")}`;
        execSync(devInstallCmd, { stdio: "inherit", cwd });
        console.log(`     ✔ Installed devDependencies: ${devDependencies.join(", ")}`);
      }

      execSync("npm install --silent", { stdio: "inherit", cwd });
      console.log(`     ✔ Installed ${project}\n`);
    } catch (error) {
      console.error(`    ❌ Error installing in ${label}\n       ${error.message}\n`);
    }
  });
};

module.exports = { load };
