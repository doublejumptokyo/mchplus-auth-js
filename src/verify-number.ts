import axios from 'axios'
// import humps from 'humps'
import env from './env'

export class VerifyNumber {
  private clientId: string
  private web3: any
  private env: string
  private lang: string

  defaultAccount: string

  constructor(clientId, web3, env, lang) {
    this.clientId = clientId
    this.web3 = web3
    this.env = env
    this.lang = lang
  }

  get baseUrl(): string {
    return env[this.env].verifyNumberUri
  }

  async getRegions() {
    const url = '/api/master/regions'
    return await axios.get(`${this.baseUrl}${url}`)
  }

  async getAddress() {
    const accounts = await this.web3.eth.getAccounts()
    return accounts.pop()
  }

  async sign(web3, confirmationPin, address) {
    const signature = await web3.eth.personal.sign(`Confirmation Pin: ${confirmationPin}`, address)
    return signature
  }

  async submitInput(phoneNumber, isCall) {
    try {
      console.log(this.clientId)
      const address = await this.getAddress()
      const url = '/api/phone/register'
      const type = isCall ? 'call' : ''
      await axios.post(
        `${this.baseUrl}${url}` , { clientId: this.clientId, phoneNumber, address, lang: this.lang, type }
      )
      return 'Confirmed'
    } catch (e) {
      console.error('Input from error: ', e)
      return 'Error'
    }
  }
}

export default VerifyNumber
