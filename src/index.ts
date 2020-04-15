import VerifyNumber from './verify-number'
import Authorize from './authorize'

export class MchplusAuth {
  private web3: any
  private env: string
  private verifyNumber: VerifyNumber
  private authorize: Authorize


  constructor(clientId = "localhost", web3, env = 'sand', lang = 'en') {
    this.web3 = web3
    this.env = env
    this.verifyNumber = new VerifyNumber(clientId, web3, env, lang)
    this.authorize = new Authorize(clientId, web3, env, lang)

    this.checkInput()
  }

  checkInput() {
    console.info('%c[mchplus auth] initialized','background: #222; color: #bada55')
    if (!(this.env === 'sand' || this.env === 'prod')) {
      throw Error('Incorrect env specified, please use either sand or prod')
    }
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

  async signAuth() {
    return this.authorize.sign()
  }
}

export default MchplusAuth
