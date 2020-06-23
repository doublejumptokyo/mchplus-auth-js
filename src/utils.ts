export class Utils {
  private web3

  constructor(web3) {
    this.web3 = web3
  }

  get walletName(): string {
    if (!this.web3) return 'unknown';

    if (this.web3.currentProvider.isMetaMask)
        return 'metamask';

    if (this.web3.currentProvider.isTorus)
        return 'torus';

    if (this.web3.currentProvider.isOpera)
        return 'opera';

    if (this.web3.currentProvider.isTrust)
        return 'trust';

    if (this.web3.currentProvider.isGoWallet)
        return 'goWallet';

    if (this.web3.currentProvider.isStatus)
        return 'status';

    if (this.web3.currentProvider.isToshi)
        return 'coinbase';
    return 'unknown';
  }
}

export default Utils
