"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env = {
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
};
exports.default = env;
