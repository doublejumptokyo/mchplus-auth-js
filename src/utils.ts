export class Utils {
  private web3

  constructor(web3) {
    this.web3 = web3
  }

  get walletName(): string {
    if (!this.web3) return 'noweb3';

    if (this.web3.currentProvider.isMetaMask)
        // https://metamask.io/
        return 'metamask';

    if (this.web3.currentProvider.isTorus)
        // https://tor.us/
        return 'torus';

    if (this.web3.currentProvider.isOpera)
        // https://www.opera.com/ja/crypto
        return 'opera';

    if (this.web3.currentProvider.isBrave)
        // https://brave.com/
        return 'brave';

    if (this.web3.currentProvider.isTokenPocket)
        // https://tokenpocket.jp/ja/
        return 'tokenPocket';

    if (this.web3.currentProvider.isTrust)
        // https://trustwallet.com/
        return 'trust';

    if (this.web3.currentProvider.isGoWallet)
        // https://www.go-wallet.app/
        return 'goWallet';

    if (this.web3.currentProvider.isStatus)
        // https://status.im/
        return 'status';

    if (this.web3.currentProvider.isToshi)
        // https://wallet.coinbase.com/
        return 'coinbase';

    return 'unknown';
  }
}

export default Utils
