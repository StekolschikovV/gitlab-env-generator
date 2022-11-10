const fs = require("fs");
import { GitLabEnvGenerator} from "./gitlab-env-generator";

const conf: {
    [key: string]: string | null
} = {
    dir: "./backend",
    file: ".env",
    token: null,
    projectName: null,
    url: null,
}

process.argv.forEach(pa => {
    const paArr = pa.split("=")
    if (paArr[0].split("--").length === 1)
        return
    const paName = paArr[0].split("--")[1]
    if (paName) {
        conf[`${paName}`] = paArr[1]
        if (paName === "env") {
            const data = fs.readFileSync(paArr[1], {encoding:'utf8', flag:'r'});
            data.split("\n").forEach( (line: string) => {
                if (line) {
                    conf[line.split("=")[0]] = line.split("=")[1]
                }
            })
        }
    }
})

Object.keys(conf).forEach(key => {
    if ( conf[key] === null) {
        const errorText = `You must specify the ${key}`
        throw (errorText)
    }
})

if (conf['token'] &&  conf['url'] && conf['projectName'] && conf["dir"] && conf["file"]) {
    new GitLabEnvGenerator( conf['url'], conf['token'], conf['projectName'], conf["dir"], conf["file"])
}
