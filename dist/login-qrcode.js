"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginQrcode = void 0;
const axios_1 = __importDefault(require("axios"));
const env_1 = __importDefault(require("./env"));
class LoginQrcode {
    constructor(clientId, env) {
        this.clientId = clientId;
        this.env = env;
    }
    get baseUrl() {
        return this.env === 'prod' ? env_1.default.prod.loginQrcode : env_1.default.sand.loginQrcode;
    }
    async getQRCode(callbackUrl, state) {
        const params = new URLSearchParams();
        params.append("response_type", "code");
        params.append("client_id", this.clientId);
        params.append("state", state);
        params.append("redirect_uri", callbackUrl);
        const url = "/api/qr/qr.png?" + params.toString();
        const ret = await axios_1.default.get(`${this.baseUrl}${url}`);
        return ret.data;
    }
}
exports.LoginQrcode = LoginQrcode;
exports.default = LoginQrcode;
