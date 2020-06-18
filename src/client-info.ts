import axios from 'axios'
import env from './env'

export class ClientInfo {
  private clientId: string
  private lang: string

  defaultAccount: string

  constructor(clientId, lang = 'en') {
    this.clientId = clientId
    this.lang = lang
  }

  get baseUrl(): string {
    return env.prod.authUri
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
