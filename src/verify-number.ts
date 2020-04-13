import axios from 'axios'
// import humps from 'humps'
import env from './env'

export class VerifyNumber {
  private clientId: string
  private web3: any
  private number: number
  private env: string

  defaultAccount: string

  constructor(clientId, web3, number, env) {
    this.clientId = clientId
    this.web3 = web3
    this.number = number
    this.env = env
  }

  get baseUrl(): string {
    return this.env === 'prod' ? env.prod : env.sand
  }

  get checkWeb3() {
    return console.log(this.web3)
  }

  get checkNumber() {
    return console.log(this.number)
  }

  get checkClientId() {
    return console.log(this.clientId)
  }

  async getRegions() {
    const url = '/api/master/regions'
    return await axios.get(`${this.baseUrl}${url}`)
  }

}

export default VerifyNumber
