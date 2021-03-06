import axios from 'axios'
import env from './env'

export class ClientInfo {
  private clientId: string
  private env: string
  private lang: string

  defaultAccount: string

  constructor(clientId, env, lang = 'en') {
    this.clientId = clientId
    this.env = env
    this.lang = lang
  }

  get baseUrl(): string {
    return this.env === 'prod' ? env.prod.authUri : env.sand.authUri
  }

  async getClientInfo() {
    const params = new URLSearchParams();
    params.append("client_id", this.clientId);
    params.append("lang", this.lang);
    const url = "/api/client?" + params.toString();
    const ret = await axios.get(`${this.baseUrl}${url}`);
    return ret.data
  }
}

export default ClientInfo
