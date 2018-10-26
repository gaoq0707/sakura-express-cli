"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const init_project_1 = require("./init-project");
let program = new commander_1.Command();
let argv = process.argv;
console.log("接收到的控制台参数:", argv);
let packageJson = require('../package');
program
    .version(packageJson.version, "-v, --version")
    .usage("[command] [options]");
program
    .command("init <projectName>")
    .option("-t, --template <template>", "templateName", "local")
    .alias("i")
    .description("创建新项目(可使用模版)")
    .action(function (name, command) {
    console.log(name, command.template);
    init_project_1.InitProject.initByLocal();
});
program.parse(argv);
if (program.args.length == 0) {
    program.help();
}
