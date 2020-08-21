export class Utils {
  private web3

  constructor(web3) {
    this.web3 = web3
  }

  get walletName(): string {
    const potentialWallet = this.findWalletName(this.web3.currentProvider)

    if (!this.web3) return 'noWeb3';

    if (!this.web3.currentProvider) return 'noProviderInfo'

    // https://metamask.io/
    if (this.web3.currentProvider.isMetaMask) return 'metamask';

    // https://tor.us/
    if (this.web3.currentProvider.isTorus) return 'torus';

    // https://www.opera.com/ja/crypto
    if (this.web3.currentProvider.isOpera) return 'opera';

    // https://tokenpocket.jp/ja/
    if (this.web3.currentProvider.isTokenPocket) return 'tokenPocket';

    // https://trustwallet.com/
    if (this.web3.currentProvider.isTrust) return 'trust';

    // https://www.go-wallet.app/
    if (this.web3.currentProvider.isGoWallet) return 'goWallet';

    // https://status.im/
    if (this.web3.currentProvider.isStatus) return 'status';

    // https://wallet.coinbase.com/
    if (this.web3.currentProvider.isToshi) return 'coinbase';
    
    // https://www.meetdapper.com/
    if (this.web3.currentProvider.isDapper) return 'dapper';
    
    // https://developer.samsung.com/blockchain/platform/programming-guide/cucumber-webview.html
    if (this.web3.currentProvider.isCucumber) return 'samsung';
    
    // https://tokenpocket.jp/ja/
    if (this.web3.currentProvider.isTokenPocketCrypton) return 'dedicatedTokenPocketApp';

    // https://alphawallet.com/
    if (this.web3.currentProvider.isAlpha) return 'alphaWallet';
    
    // https://qurage.app/en
    if (this.web3.currentProvider.isQurage) return 'qurage';

    return `unknown: ${potentialWallet}`;
  }

  findWalletName(currentProvider) {
    let potentialWalletName = ''
    for (let key in currentProvider) {
       if (key.startsWith('is')) {
            potentialWalletName = !potentialWalletName.length ? key : potentialWalletName.concat(', ', key)
       }
    }
    return potentialWalletName
  }
}


export default Utils
