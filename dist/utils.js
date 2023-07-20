"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
class Utils {
    constructor(provider) {
        this.provider = provider;
    }
    get walletName() {
        const potentialWallet = this.findWalletName(this.provider);
        if (!this.provider)
            return "noProvider";
        // https://brave.com/
        if (navigator.brave)
            return "brave";
        // https://tor.us/
        if (this.provider.isTorus)
            return "torus";
        // https://www.opera.com/ja/crypto
        if (this.provider.isOpera)
            return "opera";
        // https://tokenpocket.jp/ja/
        if (this.provider.isTokenPocket)
            return "tokenPocket";
        // https://trustwallet.com/
        if (this.provider.isTrust)
            return "trust";
        // https://www.go-wallet.app/
        if (this.provider.isGoWallet)
            return "goWallet";
        // https://wallet.coinbase.com/
        if (this.provider.isToshi)
            return "coinbase";
        // https://www.meetdapper.com/
        if (this.provider.isDapper)
            return "dapper";
        // https://developer.samsung.com/blockchain/platform/programming-guide/cucumber-webview.html
        if (this.provider.isCucumber)
            return "samsung";
        // https://tokenpocket.jp/ja/
        if (this.provider.isTokenPocketCrypton)
            return "dedicatedTokenPocketApp";
        // https://alphawallet.com/
        if (this.provider.isAlpha)
            return "alphaWallet";
        // https://qurage.app/en
        if (this.provider.isQurage)
            return "qurage";
        // https://goldenwallet.io/
        if (this.provider.isGolden)
            return "golden";
        // https://techcrunch.com/2018/04/13/coinbase-acquires-decentralized-app-browser-wallet-cipher-browser/
        if (this.provider.isCipher)
            return "cipher";
        // https://www.myetherwallet.com/
        if (this.provider.isMew)
            return "mew";
        // https://token.im/
        if (this.provider.isImToken)
            return "imToken";
        // https://www.dapppocket.io/
        if (this.provider.isDappPocket)
            return "dappPocket";
        // https://www.alicedapp.com/
        if (this.provider.isAlice)
            return "alice";
        // https://alphawallet.com/
        if (this.provider.isAlphaWallet)
            return "alphaWallet";
        // https://www.coinomi.com/en/
        if (this.provider.isCoinomi)
            return "coinomi";
        // https://mykey.org/
        if (this.provider.isMYKEY)
            return "mykey";
        // https://qpocket.io/
        if (this.provider.isQPocket)
            return "qPocket";
        // https://metamask.io/
        if (this.provider.isMetaMask)
            return "metamask";
        // https://status.im/
        // note: It's important to keep this last
        if (this.provider.isStatus)
            return "status";
        return `unknown: ${potentialWallet}`;
    }
    findWalletName(currentProvider) {
        let potentialWalletName = "";
        for (let key in currentProvider) {
            if (key.startsWith("is")) {
                potentialWalletName = !potentialWalletName.length
                    ? key
                    : potentialWalletName.concat(", ", key);
            }
        }
        return potentialWalletName;
    }
}
exports.Utils = Utils;
exports.default = Utils;
