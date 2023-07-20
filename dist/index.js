"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MchplusAuth = void 0;
const verify_number_1 = __importDefault(require("./verify-number"));
const authorize_1 = __importDefault(require("./authorize"));
const client_info_1 = __importDefault(require("./client-info"));
const login_qrcode_1 = __importDefault(require("./login-qrcode"));
const utils_1 = __importDefault(require("./utils"));
const ethers_1 = require("ethers");
class MchplusAuth {
    constructor(clientId = "localhost", provider, env = "sand", lang = "en") {
        provider.isStatus = true; // note: need because of ethers.js bug
        this.web3 = new ethers_1.ethers.providers.Web3Provider(provider, "any");
        this.env = env;
        this.verifyNumber = new verify_number_1.default(clientId, provider, env, lang);
        this.authorize = new authorize_1.default(clientId, provider, env, lang);
        this.clientInfo = new client_info_1.default(clientId, env, lang);
        this.loginQrcode = new login_qrcode_1.default(clientId, env);
        this.utils = new utils_1.default(provider);
        this.checkInput();
    }
    checkInput() {
        console.info("%c[mchplus auth] initialized", "background: #222; color: #bada55");
        if (!(this.env === "sand" || this.env === "prod")) {
            throw Error("Incorrect env specified, please use either sand or prod");
        }
        if (!this.web3) {
            throw Error("No Web3 instance detected.");
        }
    }
    async getNumberRegions() {
        return await this.verifyNumber.getRegions();
    }
    async submitNumber(phoneNumber, isCall) {
        return await this.verifyNumber.submitInput(phoneNumber, isCall);
    }
    async confirmNumber(confirmationPin) {
        return await this.verifyNumber.submitConfirm(confirmationPin);
    }
    async signAuth(callbackUrl) {
        return await this.authorize.sign(callbackUrl);
    }
    async getClientInfo() {
        return await this.clientInfo.getClientInfo();
    }
    async getQRCode(callbackUrl, state) {
        return await this.loginQrcode.getQRCode(callbackUrl, state);
    }
    get getWalletName() {
        return this.utils.walletName;
    }
}
exports.MchplusAuth = MchplusAuth;
exports.default = MchplusAuth;
