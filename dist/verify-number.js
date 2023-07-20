"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyNumber = void 0;
const axios_1 = __importDefault(require("axios"));
const env_1 = __importDefault(require("./env"));
const ethers_1 = require("ethers");
class VerifyNumber {
    constructor(clientId, provider, env, lang) {
        this.clientId = clientId;
        this.web3 = new ethers_1.ethers.providers.Web3Provider(provider);
        this.env = env;
        this.lang = lang;
    }
    get baseUrl() {
        return this.env === "prod"
            ? env_1.default.prod.verifyNumberUri
            : env_1.default.sand.verifyNumberUri;
    }
    async getRegions() {
        const url = "/api/master/regions";
        return await axios_1.default.get(`${this.baseUrl}${url}`);
    }
    async getAddress() {
        return this.web3.getSigner().getAddress();
    }
    async sign(confirmationPin) {
        const signature = await this.web3
            .getSigner()
            .signMessage(`Code:${confirmationPin}`);
        return signature;
    }
    async submitInput(phoneNumber, isCall) {
        try {
            const address = await this.getAddress();
            const url = "/api/phone/register";
            const type = isCall ? "call" : "";
            await axios_1.default.post(`${this.baseUrl}${url}`, {
                client_id: this.clientId,
                phone_number: phoneNumber,
                address,
                lang: this.lang,
                type,
            });
            return "Confirmed";
        }
        catch (e) {
            console.error("Input from error: ", e);
            return "Error";
        }
    }
    async submitConfirm(confirmationPin) {
        let networkId;
        let networkName;
        try {
            networkId = (await this.web3.getNetwork()).chainId;
        }
        catch (err) {
            console.error(err);
            return err;
        }
        switch (networkId) {
            case 1:
                networkName = "mainnet";
                break;
            case 3:
                networkName = "ropsten";
                break;
            case 4:
                networkName = "rinkeby";
                break;
            case 137:
                networkName = "matic-mainnet";
                break;
            case 80001:
                networkName = "matic-mumbai";
                break;
            case 56:
                networkName = "bsc-mainnet";
                break;
            case 97:
                networkName = "bsc-testnet";
                break;
            case 336:
                networkName = "shiden-mainnet";
                break;
            case 81:
                networkName = "shiden-shibuya";
                break;
            case 11421:
                networkName = "jcbi";
                break;
            case 248:
                networkName = "oasys-mainnet";
                break;
            case 29548:
                networkName = "mch-verse";
                break;
            case 19011:
                networkName = "home-verse";
                break;
            case 20197:
                networkName = "sand-verse";
                break;
        }
        try {
            const address = await this.getAddress();
            const signature = await this.sign(confirmationPin);
            const url = "/api/phone/confirm";
            const network = networkName;
            await axios_1.default.post(`${this.baseUrl}${url}`, {
                address,
                sig: signature,
                network,
            });
            return "success!";
        }
        catch (e) {
            console.error("Confirm number error: ", e);
            return e;
        }
    }
}
exports.VerifyNumber = VerifyNumber;
exports.default = VerifyNumber;
