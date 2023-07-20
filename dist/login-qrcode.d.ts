export declare class LoginQrcode {
    private clientId;
    private env;
    defaultAccount: string;
    constructor(clientId: any, env: any);
    get baseUrl(): string;
    getQRCode(callbackUrl: any, state: any): Promise<any>;
}
export default LoginQrcode;
