import VerifyNumber from "./verify-number";
import Authorize from "./authorize";
import ClientInfo from "./client-info";
import LoginQrcode from "./login-qrcode";
import Utils from "./utils";
import { ethers, providers } from "ethers";

export class MchplusAuth {
  private web3: providers.Web3Provider;
  private env: string;
  private verifyNumber: VerifyNumber;
  private authorize: Authorize;
  private clientInfo: ClientInfo;
  private loginQrcode: LoginQrcode;
  private utils: Utils;

  constructor(clientId = "localhost", provider, env = "sand", lang = "en") {
    this.web3 = new ethers.providers.Web3Provider(provider, "any");
    this.env = env;
    this.verifyNumber = new VerifyNumber(clientId, provider, env, lang);
    this.authorize = new Authorize(clientId, provider, env, lang);
    this.clientInfo = new ClientInfo(clientId, env, lang);
    this.loginQrcode = new LoginQrcode(clientId, env);
    this.utils = new Utils(provider);

    this.checkInput();
  }

  checkInput() {
    console.info(
      "%c[mchplus auth] initialized",
      "background: #222; color: #bada55"
    );
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

  get getWalletName(): string {
    return this.utils.walletName;
  }
}

export default MchplusAuth;
