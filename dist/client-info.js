"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientInfo = void 0;
const axios_1 = __importDefault(require("axios"));
const env_1 = __importDefault(require("./env"));
class ClientInfo {
    constructor(clientId, env, lang = 'en') {
        this.clientId = clientId;
        this.env = env;
        this.lang = lang;
    }
    get baseUrl() {
        return this.env === 'prod' ? env_1.default.prod.authUri : env_1.default.sand.authUri;
    }
    async getClientInfo() {
        const params = new URLSearchParams();
        params.append("client_id", this.clientId);
        params.append("lang", this.lang);
        const url = "/api/client?" + params.toString();
        const ret = await axios_1.default.get(`${this.baseUrl}${url}`);
        return ret.data;
    }
}
exports.ClientInfo = ClientInfo;
exports.default = ClientInfo;
