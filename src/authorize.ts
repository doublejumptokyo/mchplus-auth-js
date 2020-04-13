// import axios from 'axios'
// import humps from 'humps'
import env from './env'

export class Authorize {
  private web3: any
  private env: string
  // private lang: string

  defaultAccount: string

  constructor(web3, env) {
    this.web3 = web3
    this.env = env
    // this.lang = lang
  }

  get baseUrl(): string {
    return this.env === 'prod' ? env.prod.authUri : env.sand.authUri
  }

  async getAddress() {
    const accounts = await this.web3.eth.getAccounts()
    return accounts.pop()
  }

  // async getMessage() {
  //   const params = new URLSearchParams();
  //   params.append("response_type", "code");
  //   params.append("scope", this.scope);
  //   params.append("client_id", this.clientID);
  //   params.append("state", this.state);
  //   params.append("redirect_uri", this.redirectURL);
  //   params.append("address", this.from);
  //   params.append("lang", this.lang);
  //   const url = "/api/authorize?" + params.toString();
  //   const ret = await this.$axios.$get(url);
  //   return ret.message;
  // }
}

export default Authorize
