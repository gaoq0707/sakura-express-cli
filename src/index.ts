/// Copyright 2018 Gao Qiang (gaoqiang@gagogroup.cn). All rights reserved.
// Use of this source code is governed a license that can be found in the LICENSE file.

import {Command} from "commander";
import {PackageJson} from "./types";
import {Answers, Inquirer, Questions} from "inquirer";
import * as inquirer from "inquirer";
import * as symbols from "log-symbols";
import * as ora from "ora";
import * as fs from "fs";
import * as chalk from "chalk";
import * as path from "path";
import * as download from "download";

let program: Command = new Command();

// 控制台输入参数
let argv: string[] = process.argv;

// console.log("接收到的控制台参数:", argv);
/*
* 版本号
* */
let packageJson: PackageJson = require("../package");
program
  .version(packageJson.version, "-v, --version")
  .usage("[command] [options]");

/*
* 创建新项目
* */
program
  .command("init")
  .option("-t, --template <template>", "templateName", "local")
  .alias("i")
  .description("创建新项目(可使用模版)")
  .action(async function (name, command) {
    let qs: Questions = [{
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

    let answers: Answers = await inquirer.prompt(qs);
    if (answers.projectName) {
      let projectPath = path.resolve(answers.projectName);
      if (!fs.existsSync(answers.projectName)) {
        console.log(`Start to init a project in ${chalk.default.green(projectPath)}`);

        // 根据将要构建的项目名称创建文件夹
        fs.mkdirSync(answers.projectName);
        console.log(symbols.success, chalk.default.green("创建目录:" + projectPath));

        // 从git下载基础工程
        let spinner = ora("正在下载模版...");
        spinner.start("开始下载...");
        try {
          let downloadUrl: string = "http://git.azure.gagogroup.cn/project-standard/project-base-api/repository/master/archive.zip";
          let downLoadResult: any = await download(downloadUrl, answers.projectName, {
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

            // 渲染package.json
            let packageJsonPath: string = `${name}/package.json`;
            let packageJsonContent: string = fs.readFileSync(packageJsonPath).toString();
            fs.writeFileSync(packageJsonPath, Handlebars.compile(packageJsonContent)(answers));
            console.log(symbols.success, chalk.default.green("渲染 package.json 完成!"));

            console.log(symbols.success, chalk.default.green(`项目 [${answers.projectName}] 初始化完成!`));
          }
        } catch (err) {
          spinner.fail();
          console.log(symbols.error, chalk.default.red(err));
        }

      } else {
        console.log(symbols.error, chalk.default.red("已存在相同目录:" + projectPath));
      }
    } else {
      console.log(symbols.error, chalk.default.red("未输入项目名称!"));
    }
  });

program.parse(argv);

/*
* 帮助
* */
if (program.args.length === 0) {
  // 这里是处理默认没有输入参数或者命令的时候，显示help信息
  program.help();
}
