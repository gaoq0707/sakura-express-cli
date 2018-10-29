"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const inquirer = require("inquirer");
const symbols = require("log-symbols");
const ora = require("ora");
const fs = require("fs");
const chalk = require("chalk");
const path = require("path");
const download = require("download");
let program = new commander_1.Command();
let argv = process.argv;
let packageJson = require("../package");
program
    .version(packageJson.version, "-v, --version")
    .usage("[command] [options]");
program
    .command("init")
    .option("-t, --template <template>", "templateName", "local")
    .alias("i")
    .description("创建新项目(可使用模版)")
    .action(function (name, command) {
    return __awaiter(this, void 0, void 0, function* () {
        let qs = [{
                type: "input",
                name: "projectName",
                message: "请输入项目名称"
            }, {
                type: "input",
                name: "projectDesc",
                message: "请输入项目描述"
            }, {
                type: "input",
                name: "authorName",
                message: "请输入作者名称"
            }, {
                type: "input",
                name: "authorEmail",
                message: "请输入作者邮箱"
            }];
        let answers = yield inquirer.prompt(qs);
        if (answers.projectName) {
            let projectPath = path.resolve(answers.projectName);
            if (!fs.existsSync(answers.projectName)) {
                console.log(`Start to init a project in ${chalk.default.green(projectPath)}`);
                fs.mkdirSync(answers.projectName);
                console.log(symbols.success, chalk.default.green("创建目录:" + projectPath));
                let spinner = ora("正在下载模版...");
                spinner.start("开始下载...");
                try {
                    let downloadUrl = "http://git.azure.gagogroup.cn/project-standard/project-base-api/repository/master/archive.zip";
                    let downLoadResult = yield download(downloadUrl, answers.projectName, {
                        extract: true,
                        strip: 1,
                        headers: {
                            accept: "application/zip"
                        }
                    });
                    for (let file of downLoadResult) {
                        spinner.info(chalk.default.gray(file.type + ":" + file.path));
                    }
                    if (downLoadResult) {
                        spinner.succeed(chalk.default.green("下载完成..."));
                        let packageJsonPath = `${name}/package.json`;
                        let packageJsonContent = fs.readFileSync(packageJsonPath).toString();
                        fs.writeFileSync(packageJsonPath, Handlebars.compile(packageJsonContent)(answers));
                        console.log(symbols.success, chalk.default.green("渲染 package.json 完成!"));
                        console.log(symbols.success, chalk.default.green(`项目 [${answers.projectName}] 初始化完成!`));
                    }
                }
                catch (err) {
                    spinner.fail();
                    console.log(symbols.error, chalk.default.red(err));
                }
            }
            else {
                console.log(symbols.error, chalk.default.red("已存在相同目录:" + projectPath));
            }
        }
        else {
            console.log(symbols.error, chalk.default.red("未输入项目名称!"));
        }
    });
});
program.parse(argv);
if (program.args.length === 0) {
    program.help();
}
