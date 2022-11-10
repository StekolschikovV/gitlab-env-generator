export declare class GitLabEnvGenerator {
    projects: string[];
    GitLabApiHttp: any;
    projectName: string;
    dir: string;
    file: string;
    variablesStr: string;
    constructor(url: string, token: string, projectName: string, dir: string, file: string);
    init: (url: string, token: string) => Promise<void>;
    save: () => void;
    load: () => Promise<void>;
    loadProjects: () => any;
    loadVariables: (projectId: string) => Promise<any[]>;
}
//# sourceMappingURL=gitlab-env-generator.d.ts.map