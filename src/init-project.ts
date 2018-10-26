/// Copyright 2018 Gao Qiang (gaoqiang@gagogroup.cn). All rights reserved.
// Use of this source code is governed a license that can be found in the LICENSE file.

import * as download from "download";
import * as fs from "fs";

const gitHubBaseUrl = "http://git.azure.gagogroup.cn/";

export class InitProject {

  /*
  * 下载本地部署模版包
  * */
  static async initByLocal() {
    let downloadUrl: string = gitHubBaseUrl + "project-standard/project-base-api/repository/master/archive.zip";
    if (fs.existsSync("dist")) {
      fs.rmdirSync("dist");
    }
    let downLoadResult: any = await download(downloadUrl, "dist", {
      extract: true
    });
    if (downLoadResult) {
      fs.renameSync("dist/" + fs.readdirSync("dist")[0], "dist/temp")
    }
  }
}