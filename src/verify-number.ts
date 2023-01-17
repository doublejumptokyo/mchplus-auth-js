import axios from "axios";
import env from "./env";
import { ethers, providers } from "ethers";

export class VerifyNumber {
  private clientId: string;
  private web3: providers.Web3Provider;
  private env: string;
  private lang: string;

  defaultAccount: string;

  constructor(clientId, provider, env, lang) {
    this.clientId = clientId;
    this.web3 = new ethers.providers.Web3Provider(provider);
    this.env = env;
    this.lang = lang;
  }

  get baseUrl(): string {
    return this.env === "prod"
      ? env.prod.verifyNumberUri
      : env.sand.verifyNumberUri;
  }

  async getRegions() {
    const url = "/api/master/regions";
    return await axios.get(`${this.baseUrl}${url}`);
  }

  async getAddress() {
    const accounts = await this.web3.listAccounts();
    return accounts.pop();
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
      await axios.post(`${this.baseUrl}${url}`, {
        client_id: this.clientId,
        phone_number: phoneNumber,
        address,
        lang: this.lang,
        type,
      });
      return "Confirmed";
    } catch (e) {
      console.error("Input from error: ", e);
      return "Error";
    }
  }

  async submitConfirm(confirmationPin) {
    let networkId;
    let networkName;
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
        networkName = "oasys-homeverse";
        break;
      case 20197:
        networkName = "oasys-sandverse";
        break;
    }

    try {
      const address = await this.getAddress();
      const signature = await this.sign(confirmationPin);
      const url = "/api/phone/confirm";
      const network = networkName;
      await axios.post(`${this.baseUrl}${url}`, {
        address,
        sig: signature,
        network,
      });
      return "success!";
    } catch (e) {
      console.error("Confirm number error: ", e);
      return e;
    }
  }
}

export default VerifyNumber;
