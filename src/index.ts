import VerifyNumber from './verify-number'

export class MchplusAuth {
  private web3: any
  private env: string
  private verifyNumber: VerifyNumber


  constructor(web3, env = 'sand', lang = 'en') {
    this.env = env
    this.web3 = web3
    this.verifyNumber = new VerifyNumber(web3, env, lang)

    this.checkInput()
  }

  checkInput() {
    console.info('-------------------------')
    console.info('[mchplus auth] initialized')
    console.info('env :', this.env)
    console.info('web3 :', this.web3)
    console.info('-------------------------')
    if (this.env !== ('sand' || 'prod')) {
      throw Error('Incorrect env specified, please use either sand or prod')
    }
  }

  async getNumberRegions() {
    return await this.verifyNumber.getRegions()
  }

  async submitNumber(phoneNumber, isCall) {
    return await this.verifyNumber.submitInput(phoneNumber, isCall)
  }
}

export default MchplusAuth
