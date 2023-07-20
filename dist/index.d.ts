export declare class MchplusAuth {
    private web3;
    private env;
    private verifyNumber;
    private authorize;
    private clientInfo;
    private loginQrcode;
    private utils;
    constructor(clientId: string, provider: any, env?: string, lang?: string);
    checkInput(): void;
    getNumberRegions(): Promise<import("axios").AxiosResponse<any>>;
    submitNumber(phoneNumber: any, isCall: any): Promise<"Confirmed" | "Error">;
    confirmNumber(confirmationPin: any): Promise<any>;
    signAuth(callbackUrl: any): Promise<any>;
    getClientInfo(): Promise<any>;
    getQRCode(callbackUrl: any, state: any): Promise<any>;
    get getWalletName(): string;
}
export default MchplusAuth;
