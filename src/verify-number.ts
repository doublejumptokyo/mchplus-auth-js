import axios from 'axios'
// import humps from 'humps'
import env from './env'

export class VerifyNumber {
  private web3: any
  private env: string
  private lang: string

  defaultAccount: string

  constructor(web3, env, lang) {
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
      const address = await this.getAddress()
      const url = '/api/phone/register'
      const type = isCall ? 'call' : ''
      console.log('input :', phoneNumber, address, this.lang, type )
      await axios.post(
        `${this.baseUrl}${url}` , { phoneNumber, address, lang: this.lang, type }
      )
      return 'Confirmed'
    } catch (e) {
      console.error('Input from error: ', e)
      return 'Error'
    }
  }
}

export default VerifyNumber
