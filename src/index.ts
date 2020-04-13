import env from './env'
import VerifyNumber from './verify-number'

export class MchplusAuth {
  private clientId: string
  private web3: any
  private env: string
  private verifyNumber: VerifyNumber


  constructor(clientId, web3, number, env = 'sand', ) {
    this.clientId = clientId
    this.env = env
    this.web3 = web3
    this.verifyNumber = new VerifyNumber(clientId, web3, number, env)

    this.checkInput()
  }

  get baseUrl(): string {
    return this.env === 'prod' ? env.prod : env.sand
  }

  checkInput() {
    console.info('mchplus auth initialized')
    console.info('-------------------------')
    console.info('env :', this.env)
    console.info('clientId :', this.clientId)
    console.info('web3 :', this.web3)
    console.info('number :', this.number)
  }

  async getNumberRegions() {
    return await this.verifyNumber.getRegions()
  }

  get number() {
    return this.verifyNumber.checkNumber
  }
}

export default MchplusAuth
