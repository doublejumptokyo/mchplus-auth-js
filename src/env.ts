
interface Env {
  sand: {
    clientId: string
    lang: string
    authUri: string
    verifyNumberUri: string
    loginQrcode: string
  },
  prod: {
    clientId: string
    lang: string
    authUri: string
    verifyNumberUri: string
    loginQrcode: string
  },

}


const env: Env = {
  sand: {
    clientId: "pls-sand",
    lang: "ja",
    authUri: "https://auth.mch.plus.sand.pls.djty.co",
    verifyNumberUri: "https://auth.mch.plus.sand.pls.djty.co",
    loginQrcode: "https://auth.mch.plus.sand.pls.djty.co"
  },
  prod: {
    clientId: "pls-prod",
    lang: "ja",
    authUri: "https://auth.mch.plus",
    verifyNumberUri: "https://auth.mch.plus",
    loginQrcode: "https://auth.mch.plus"
  }
}
export default env
