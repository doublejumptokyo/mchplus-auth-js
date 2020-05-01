import axios from 'axios'
import Cookies from 'universal-cookie';
import env from './env'
const cookies = new Cookies();

export class Authorize {
  private clientId: string
  private web3: any
  private env: string
  private lang: string
  private message: string
  private cookieName: string

  defaultAccount: string

  constructor(clientId, web3, env, lang = 'en', cookieName) {
    this.clientId = clientId
    this.web3 = web3
    this.env = env
    this.lang = lang
    this.cookieName = cookieName
  }

  get baseUrl(): string {
    return this.env === 'prod' ? env.prod.authUri : env.sand.authUri
  }

  get state(): string {	
    const state = Math.floor(Math.random() * 100000);	
    cookies.set(this.cookieName, state, { maxAge: 600 });	
    return String(state);	
  }

  async getAddress() {
    const accounts = await this.web3.eth.getAccounts()
    return accounts.pop()
  }

  async getMessage() {
    const address = await this.getAddress()
    const params = new URLSearchParams();
    params.append("response_type", "code");	
    params.append("scope", "openid profile");
    params.append("client_id", this.clientId);
    params.append("state", this.state);	
    params.append("redirect_uri", "http://localhost:3000/callback");	
    params.append("address", address);
    params.append("lang", this.lang);
    const url = "/api/authorize?" + params.toString();
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
        redirect_uri: "http://localhost:3000/callback", // todo: make optional on server
        lang: this.lang,
        state: this.state
      });
      return res
    } catch (err) {
      console.error(err);
      return;
    }
  }
}

export default Authorize
