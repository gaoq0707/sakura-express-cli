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
const download = require("download");
const fs = require("fs");
const gitHubBaseUrl = "http://git.azure.gagogroup.cn/";
class InitProject {
    static initByLocal() {
        return __awaiter(this, void 0, void 0, function* () {
            let downloadUrl = gitHubBaseUrl + "project-standard/project-base-api/repository/master/archive.zip";
            if (fs.existsSync("dist")) {
                fs.rmdirSync("dist");
            }
            let downLoadResult = yield download(downloadUrl, "dist", {
                extract: true
            });
            if (downLoadResult) {
                fs.renameSync("dist/" + fs.readdirSync("dist")[0], "dist/temp");
            }
        });
    }
}
exports.InitProject = InitProject;
