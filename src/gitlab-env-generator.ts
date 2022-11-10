const axios = require("axios");
const fs = require("fs");
const path = require('path');

export class GitLabEnvGenerator {

    projects: string[] = []
    GitLabApiHttp: any
    projectName = ""
    dir = ""
    file = ""
    variablesStr = ""

    constructor(url: string, token: string, projectName: string, dir: string, file: string) {
        this.projectName = projectName
        this.dir = dir
        this.file = file
        this.init(url, token)
    }

    init = async (url: string, token: string) => {
        this.GitLabApiHttp = axios.create({
            baseURL: url,
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
        await this.load()
        this.save()
    }

    save = () => {
        const filePath = path.normalize(this.dir + "/" + this.file)
        const dirPath = path.normalize(this.dir)
        if (!fs.existsSync(dirPath))
            fs.mkdirSync(dirPath)
        // if (fs.existsSync(filePath))
        //     fs.unlinkSync(`${filePath}`);

        fs.appendFile(`${filePath}`, this.variablesStr, (err: any) => {
            if (err)
            return console.log(err);
        });
    }

    load = async () => {
        this.projects = []
        let variablesTemp = []
        const projects = (await this.loadProjects()).data
        for (let project of projects)
            if (project.name === this.projectName){
                // console.log(project)
                variablesTemp = (await this.loadVariables(project.id)) || []
                // variablesTemp = (await this.loadVariables(project.id)).data || []
                // console.log(variablesTemp)

            }


        variablesTemp.forEach( (e: { key: string; value: string}) => {
            this.variablesStr += `${e.key}=${e.value}\n`
        })
    }


    loadProjects = () => {
        return this.GitLabApiHttp.get("projects")
    }

    loadVariables = async (projectId: string) => {
        let result: any[] = []
        let page = 0
         const get = async () => {
             const response = (await this.GitLabApiHttp.get(`projects/${projectId}/variables?page=${page}`)).data
             result = result.concat(response)
             if (response.length > 0) {
                 page += 1
                 await get()
             }

         }
        await get()
        return result
    }

}

