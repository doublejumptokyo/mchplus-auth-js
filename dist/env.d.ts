interface Env {
    sand: {
        clientId: string;
        lang: string;
        authUri: string;
        verifyNumberUri: string;
        loginQrcode: string;
    };
    prod: {
        clientId: string;
        lang: string;
        authUri: string;
        verifyNumberUri: string;
        loginQrcode: string;
    };
}
declare const env: Env;
export default env;
