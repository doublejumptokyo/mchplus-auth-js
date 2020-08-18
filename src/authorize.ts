import axios from 'axios'
import env from './env'
import Utils from './utils'

export class Authorize {
  private clientId: string
  private web3: any
  private lang: string
  private message: string

  defaultAccount: string

  constructor(clientId, web3, lang = 'en') {
    this.clientId = clientId
    this.web3 = web3
    this.lang = lang
  }

  get baseUrl(): string {
    return  env.prod.authUri
  }

  get state(): string {	
    const state = Math.floor(Math.random() * 100000);	
    // cookies.set(this.cookieName, state, {  path: '/', maxAge: 600 });	
    return String(state);	
  }

  async getAddress() {
    const accounts = await this.web3.eth.getAccounts()
    return accounts.pop()
  }

  async getMessage(callbackUrl) {
    const utils = new Utils(this.web3)
    const address = await this.getAddress()
    const params = new URLSearchParams();
    params.append("response_type", "code");	
    params.append("scope", "openid profile");
    params.append("client_id", this.clientId);
    params.append("wallet_name", utils.walletName || 'no wallet name');
    params.append("state", this.state);	
    params.append("redirect_uri", callbackUrl);	
    params.append("address", address);
    params.append("lang", this.lang);
    const url = "/api/authorize?" + params.toString();
    const ret = await axios.get(`${this.baseUrl}${url}`);
    return ret.data
  }

  async sign(callbackUrl) {
    const messageRes = await this.getMessage(callbackUrl)
    this.message = messageRes.message
    const address = await this.getAddress();
    let networkName
    let networkId
    let signature;
    let codeRes
    
    try {
      networkId = await this.web3.eth.net.getId();
    } catch (err) {
      console.error(err);
      return err;
    }

    switch(networkId){
      case 1: 
        networkName = "mainnet";
        break;
      case 3:
        networkName = "ropsten";
        break;
      case 4:
        networkName = "rinkeby"
    }

    try {
      signature = await this.web3.eth.personal.sign(this.message, address);
    } catch (err) {
      console.error(err);
      return err;
    }

    try {
      const url = "/api/login"
      codeRes = await axios.post(`${this.baseUrl}${url}`, {
        address: address,
        client_id: this.clientId,
        signature: signature,
        network: networkName, // todo: allow other networks
        redirect_uri: callbackUrl, 
        lang: this.lang,
        state: this.state
      });
    } catch (err) {
      console.error(err);
      return;
    }
    return codeRes.data
  }
}

export default Authorize
