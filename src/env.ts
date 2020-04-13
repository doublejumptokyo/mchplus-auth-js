
interface Env {
  sand: {
    clientId: string
    lang: string
    authUri: string
    verifyNumberUri: string
  },
  prod: {
    clientId: string
    lang: string
    authUri: string
    verifyNumberUri: string
  },

}


const env: Env = {
  sand: {
    clientId: "pls-sand",
    lang: "ja",
    authUri: "https://auth.mch.plus.sand.pls.djty.co/authorize",
    verifyNumberUri: "https://auth.mch.plus.sand.pls.djty.co/verify-number"
  },
  prod: {
    clientId: "pls-prod",
    lang: "ja",
    authUri: "https://auth.mch.plus/authorize",
    verifyNumberUri: "https://auth.mch.plus/verify-number"
  }
}
export default env