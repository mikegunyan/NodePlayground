const { spawn } = require("child_process");
const { load } = require("./load");

const config = [
  { name: "server", port: 3333 },
  { name: "client", port: 4444 },
];

const dev = (args) => {
  load(args);
  let projects = [];
  if (args && args.length > 0) {
    args.forEach((arg) => {
      if (arg.includes(':')) {
        const [name, port] = arg.split(':');
        projects.push({ name, port });
      } else {
        projects.push({ name: arg, port: config.find(p => p.name === arg).port });
      }
    });
  } else projects = config;

  console.log(`🚀 Starting Dev Servers: `, projects.map(p => p.name));

  projects.forEach((project) => {
    process.env[`PORT_${project.name.toUpperCase()}`] = project.port;
    const label = project.name.toUpperCase();
    const cmd = /^win/.test(process.platform) ? "npm.cmd" : "npm";

    const proc = spawn(cmd, ["run", "dev", "--silent"], {
      cwd: `./${project.name}`,
      stdio: ["ignore", "pipe", "pipe"],
      shell: true
    });

    proc.stdout.on("data", (data) => {
      process.stdout.write(`[${label}] ${data}`);
    });

    proc.stderr.on("data", (data) => {
      process.stderr.write(`[${label} ⚠️] ${data}`);
    });

    proc.on("close", (code) => {
      console.log(`\n❌ ${label} exited with code ${code}`);
    });
  });
};

module.exports = { dev };
