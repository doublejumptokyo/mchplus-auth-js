import axios from 'axios'
import env from './env'

export class LoginQrcode {
  private clientId: string
  private env: string

  defaultAccount: string

  constructor(clientId) {
    this.clientId = clientId
  }

  get baseUrl(): string {
    return this.env === 'prod' ? env.prod.loginQrcode : env.sand.loginQrcode
  }

  async getQRCode(callbackUrl, state) {
    const params = new URLSearchParams();
    params.append("response_type", "code");	
    params.append("client_id", this.clientId);
    params.append("state", state);	
    params.append("redirect_uri", callbackUrl);	
    const url = "/api/qr/qr.png?" + params.toString();
    const ret = await axios.get(`${this.baseUrl}${url}`);
    return ret.data
  }
}

export default LoginQrcode
