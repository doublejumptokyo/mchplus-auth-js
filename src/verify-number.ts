import axios from 'axios'
import env from './env'

export class VerifyNumber {
  private clientId: string
  private web3: any
  private lang: string

  defaultAccount: string

  constructor(clientId, web3, lang) {
    this.clientId = clientId
    this.web3 = web3
    this.lang = lang
  }

  get baseUrl(): string {
    return env.prod.verifyNumberUri
  }

  async getRegions() {
    const url = '/api/master/regions'
    return await axios.get(`${this.baseUrl}${url}`)
  }

  async getAddress() {
    const accounts = await this.web3.eth.getAccounts()
    return accounts.pop()
  }

  async sign(confirmationPin) {
    const address = await this.getAddress()
    const signature = await this.web3.eth.personal.sign(`Code:${confirmationPin}`, address)
    return signature
  }

  async submitInput(phoneNumber, isCall) {
    try {
      const address = await this.getAddress()
      const url = '/api/phone/register'
      const type = isCall ? 'call' : ''
      await axios.post(
        `${this.baseUrl}${url}` , { 'client_id': this.clientId, 'phone_number': phoneNumber, address, lang: this.lang, type }
      )
      return 'Confirmed'
    } catch (e) {
      console.error('Input from error: ', e)
      return 'Error'
    }
  }

  async submitConfirm(confirmationPin) {
    let networkId
    let networkName
    try {
      networkId = await this.web3.eth.net.getId();
    } catch (err) {
      console.error(err);
      return err;
    }

    switch(networkId){
      case 1: 
        networkName = "mainnet";
        break;
      case 3:
        networkName = "ropsten";
        break;
      case 4:
        networkName = "rinkeby"
    }

    try {
      const address = await this.getAddress()
      const signature = await this.sign(confirmationPin)
      const url = '/api/phone/confirm'
      const network = networkName
      await axios.post(`${this.baseUrl}${url}`, { address, sig: signature, network })
      return "success!"
    } catch (e) {
      console.error('Confirm number error: ', e)
      return e
    }
  }
}

export default VerifyNumber
