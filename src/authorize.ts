import axios from 'axios'
import env from './env'

export class Authorize {
  private clientId: string
  private web3: any
  private env: string
  private lang: string
  private message: string

  defaultAccount: string

  constructor(clientId, web3, env, lang = 'en') {
    this.clientId = clientId
    this.web3 = web3
    this.env = env
    this.lang = lang
  }

  get baseUrl(): string {
    return this.env === 'prod' ? env.prod.authUri : env.sand.authUri
  }

  async getAddress() {
    const accounts = await this.web3.eth.getAccounts()
    return accounts.pop()
  }

  async getMessage() {
    const params = new URLSearchParams();
    params.append("client_id", this.clientId);
    params.append("lang", this.lang);
    const url = "/api/?" + params.toString();
    const ret = await axios.get(`${this.baseUrl}${url}`);
    return ret.data
  }

  async sign() {
    const messageRes = await this.getMessage()
    this.message = messageRes.message
    const address = await this.getAddress();
    let signature;
    try {
      signature = await this.web3.eth.personal.sign(this.message, address);
    } catch (err) {
      console.error(err);
      return err;
    }

    try {
      const url = "/api/login"
      const res  = await axios.post(`${this.baseUrl}${url}`, {
        address: address,
        client_id: this.clientId,
        signature: signature,
        network: "mainnet", // todo: allow other networks
        lang: this.lang,
      });
      return res
    } catch (err) {
      console.error(err);
      return;
    }
  }
}

export default Authorize
