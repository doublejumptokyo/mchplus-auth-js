import VerifyNumber from './verify-number'
import Authorize from './authorize'
import ClientInfo from './client-info'
import LoginQrcode from './login-qrcode'

export class MchplusAuth {
  private web3: any
  private verifyNumber: VerifyNumber
  private authorize: Authorize
  private clientInfo: ClientInfo
  private loginQrcode: LoginQrcode


  constructor(clientId = "localhost", web3, lang = 'en') {
    this.web3 = web3
    this.verifyNumber = new VerifyNumber(clientId, web3, lang)
    this.authorize = new Authorize(clientId, web3, lang)
    this.clientInfo = new ClientInfo(clientId, lang)
    this.loginQrcode = new LoginQrcode(clientId)

    this.checkInput()
  }

  checkInput() {
    console.info('%c[mchplus auth] initialized','background: #222; color: #bada55')
    if (!this.web3) {
      throw Error('No Web3 instance detected.')
    }
  }

  async getNumberRegions() {
    return await this.verifyNumber.getRegions()
  }

  async submitNumber(phoneNumber, isCall) {
    return await this.verifyNumber.submitInput(phoneNumber, isCall)
  }
  async confirmNumber(confirmationPin) {
    return await this.verifyNumber.submitConfirm(confirmationPin)
  }

  async signAuth(callbackUrl) {
    return await this.authorize.sign(callbackUrl)
  }
  
  async getClientInfo(){
    return await this.clientInfo.getClientInfo()
  }

  async getQRCode(callbackUrl, state){
    return await this.loginQrcode.getQRCode(callbackUrl, state)
  }
}

export default MchplusAuth
