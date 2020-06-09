import axios from 'axios'
import env from './env'

export class LoginQrcode {
  private clientId: string
  private env: string

  defaultAccount: string

  constructor(clientId, env) {
    this.clientId = clientId
    this.env = env
  }

  get baseUrl(): string {
    return this.env === 'prod' ? env.prod.loginQrcode : env.sand.loginQrcode    
  }

  get state(): string {	
    const state = Math.floor(Math.random() * 100000);	
    // cookies.set(this.cookieName, state, {  path: '/', maxAge: 600 });	
    return String(state);	
  }

  async getQRCode(callbackUrl) {
    const params = new URLSearchParams();
    params.append("response_type", "code");	
    params.append("client_id", this.clientId);
    params.append("state", this.state);	
    params.append("redirect_uri", callbackUrl);	
    const url = "/api/qr/qr.png?" + params.toString();
    const ret = await axios.get(`${this.baseUrl}${url}`);
    return ret.data
  }
}

export default LoginQrcode
