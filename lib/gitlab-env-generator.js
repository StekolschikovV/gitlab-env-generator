"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitLabEnvGenerator = void 0;
var axios = require("axios");
var fs = require("fs");
var path = require('path');
var GitLabEnvGenerator = /** @class */ (function () {
    function GitLabEnvGenerator(url, token, projectName, dir, file) {
        var _this = this;
        this.projects = [];
        this.projectName = "";
        this.dir = "";
        this.file = "";
        this.variablesStr = "";
        this.init = function (url, token) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.GitLabApiHttp = axios.create({
                            baseURL: url,
                            headers: {
                                'Authorization': "Bearer ".concat(token)
                            },
                        });
                        return [4 /*yield*/, this.load()];
                    case 1:
                        _a.sent();
                        this.save();
                        return [2 /*return*/];
                }
            });
        }); };
        this.save = function () {
            var filePath = path.normalize(_this.dir + "/" + _this.file);
            var dirPath = path.normalize(_this.dir);
            if (!fs.existsSync(dirPath))
                fs.mkdirSync(dirPath);
            // if (fs.existsSync(filePath))
            //     fs.unlinkSync(`${filePath}`);
            fs.appendFile("".concat(filePath), _this.variablesStr, function (err) {
                if (err)
                    return console.log(err);
            });
        };
        this.load = function () { return __awaiter(_this, void 0, void 0, function () {
            var variablesTemp, projects, _i, projects_1, project;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.projects = [];
                        variablesTemp = [];
                        return [4 /*yield*/, this.loadProjects()];
                    case 1:
                        projects = (_a.sent()).data;
                        _i = 0, projects_1 = projects;
                        _a.label = 2;
                    case 2:
                        if (!(_i < projects_1.length)) return [3 /*break*/, 5];
                        project = projects_1[_i];
                        if (!(project.name === this.projectName)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.loadVariables(project.id)];
                    case 3:
                        // console.log(project)
                        variablesTemp = (_a.sent()) || [];
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        variablesTemp.forEach(function (e) {
                            _this.variablesStr += "".concat(e.key, "=").concat(e.value, "\n");
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        this.loadProjects = function () {
            return _this.GitLabApiHttp.get("projects");
        };
        this.loadVariables = function (projectId) { return __awaiter(_this, void 0, void 0, function () {
            var result, page, get;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = [];
                        page = 0;
                        get = function () { return __awaiter(_this, void 0, void 0, function () {
                            var response;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.GitLabApiHttp.get("projects/".concat(projectId, "/variables?page=").concat(page))];
                                    case 1:
                                        response = (_a.sent()).data;
                                        result = result.concat(response);
                                        if (!(response.length > 0)) return [3 /*break*/, 3];
                                        page += 1;
                                        return [4 /*yield*/, get()];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); };
                        return [4 /*yield*/, get()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        }); };
        this.projectName = projectName;
        this.dir = dir;
        this.file = file;
        this.init(url, token);
    }
    return GitLabEnvGenerator;
}());
exports.GitLabEnvGenerator = GitLabEnvGenerator;
