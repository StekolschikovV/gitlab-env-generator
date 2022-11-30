#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var fs = require("fs");
var gitlab_env_generator_1 = require("./gitlab-env-generator");
var conf = {
    dir: "./backend",
    file: ".env",
    token: null,
    projectName: null,
    url: null
};
process.argv.forEach(function (pa) {
    var paArr = pa.split("=");
    if (paArr[0].split("--").length === 1)
        return;
    var paName = paArr[0].split("--")[1];
    if (paName) {
        conf["".concat(paName)] = paArr[1];
        if (paName === "env") {
            var data = fs.readFileSync(paArr[1], { encoding: 'utf8', flag: 'r' });
            data.split("\n").forEach(function (line) {
                if (line) {
                    conf[line.split("=")[0]] = line.split("=")[1];
                }
            });
        }
    }
});
Object.keys(conf).forEach(function (key) {
    if (conf[key] === null) {
        console.log("ERROR: You must specify the ".concat(key));
    }
});
if (conf['token'] && conf['url'] && conf['projectName'] && conf["dir"] && conf["file"]) {
    new gitlab_env_generator_1.GitLabEnvGenerator(conf['url'], conf['token'], conf['projectName'], conf["dir"], conf["file"]);
}
