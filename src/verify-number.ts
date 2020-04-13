import axios from 'axios'
import humps from 'humps'
import env from './env.js'

export interface Options {
  dev: boolean
}

export class EthereumManager {
  private web3: Web3

  defaultAccount: string

  constructor(env, web3, clientId, number) {
    this.env = env
    this.clientId = clientId
    this.number = number
    this.web3 = web3
  }

  get baseUrl(): string {
    return this.env === 'prod' ? env.prod : env.sand
  }

  get checkWeb3() {
    return console.log(this.web)
  }

  get checkNumber() {
    return console.log(this.number)
  }

  async getRegions() {
    const url = '/api/master/regions'
    return await axios.$get(`${baseUrl}${url}`)
  }

}

export default EthereumManager
