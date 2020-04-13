import axios from 'axios'
import humps from 'humps'
import env from './env.js'

export class PlsAuth {

  constructor(env = 'sand', lang = 'en', web3) {
    this.env = env
    this.lang = lang
    this.web3 = web3
    this.verifyNumber = new VerifyNumber(this.env, this.web3, this.clientId, this.number)

    this.checkInput()
  }

  get baseUrl(): string {
    return this.env === 'prod' ? env.prod : env.sand
  }

  get hasWallet(): boolean {
    return this.ethereumManager.hasWallet
  }

  checkInput() {
    console.log('env :', this.env)
    console.log('clientId :', this.clientId)
    console.log('web3 :', this.web3)
    console.log('number :', this.number)
  }
}

export default Mchplus
