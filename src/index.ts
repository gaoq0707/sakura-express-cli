/// Copyright 2018 Gao Qiang (gaoqiang@gagogroup.cn). All rights reserved.
// Use of this source code is governed a license that can be found in the LICENSE file.

import {Command} from "commander";
import {PackageJson} from "./types";
import {InitProject} from "./init-project";

let program: Command = new Command();

// 控制台输入参数
let argv: string[] = process.argv;

console.log("接收到的控制台参数:", argv);

/*
* 版本号
* */
let packageJson: PackageJson = require('../package');
program
  .version(packageJson.version, "-v, --version")
  .usage("[command] [options]");

/*
* 创建新项目
* */
program
  .command("init <projectName>")
  .option("-t, --template <template>", "templateName", "local")
  .alias("i")
  .description("创建新项目(可使用模版)")
  .action(function (name, command) {
    console.log(name, command.template);
    // init(template);

    InitProject.initByLocal();


  });

program.parse(argv);

/*
* 帮助
* */
if (program.args.length == 0) {
  // 这里是处理默认没有输入参数或者命令的时候，显示help信息
  program.help();
}
