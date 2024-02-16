import axios from "axios";
import env from "./env";
import Utils from "./utils";
import { ethers, providers } from "ethers";

export class Authorize {
  private clientId: string;
  private web3: providers.Web3Provider;
  private provider: providers.Provider;
  private env: string;
  private lang: string;
  private message: string;

  defaultAccount: string;

  constructor(clientId, provider, env, lang = "en") {
    this.clientId = clientId;
    this.provider = provider;
    this.web3 = new ethers.providers.Web3Provider(provider);
    this.env = env;
    this.lang = lang;
  }

  get baseUrl(): string {
    return this.env === "prod" ? env.prod.authUri : env.sand.authUri;
  }

  get state(): string {
    const state = Math.floor(Math.random() * 100000);
    // cookies.set(this.cookieName, state, {  path: '/', maxAge: 600 });
    return String(state);
  }

  async getAddress() {
    return this.web3.getSigner().getAddress();
  }

  async getMessage(callbackUrl) {
    const utils = new Utils(this.provider);
    const address = await this.getAddress();
    const params = new URLSearchParams();
    params.append("response_type", "code");
    params.append("scope", "openid profile");
    params.append("client_id", this.clientId);
    params.append("wallet_name", utils.walletName || "no wallet name");
    params.append("state", this.state);
    params.append("redirect_uri", callbackUrl);
    params.append("address", address);
    params.append("lang", this.lang);
    const url = "/api/authorize?" + params.toString();
    const ret = await axios.get(`${this.baseUrl}${url}`);
    return ret.data;
  }

  async sign(callbackUrl) {
    const messageRes = await this.getMessage(callbackUrl);
    this.message = messageRes.message;
    const address = await this.getAddress();
    let networkName;
    let networkId;
    let signature;
    let codeRes;

    try {
      networkId = (await this.web3.getNetwork()).chainId;
    } catch (err) {
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
      case 2400:
        networkName = "tcg-verse";
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
      case 11155111:
        networkName = "ethereum-sepolia";
        break;
    }

    try {
      signature = await this.web3.getSigner().signMessage(this.message);
    } catch (err) {
      console.error(`ERROR IN SIGNING AUTH ${err}`);
      return err;
    }

    try {
      const url = "/api/login";
      codeRes = await axios.post(`${this.baseUrl}${url}`, {
        address: address,
        client_id: this.clientId,
        signature: signature,
        network: networkName, // todo: allow other networks
        redirect_uri: callbackUrl,
        lang: this.lang,
        state: this.state,
      });
    } catch (err) {
      console.error(err);
      return;
    }
    return codeRes.data;
  }
}

export default Authorize;
