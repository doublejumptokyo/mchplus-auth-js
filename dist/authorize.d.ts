export declare class Authorize {
    private clientId;
    private web3;
    private provider;
    private env;
    private lang;
    private message;
    defaultAccount: string;
    constructor(clientId: any, provider: any, env: any, lang?: string);
    get baseUrl(): string;
    get state(): string;
    getAddress(): Promise<string>;
    getMessage(callbackUrl: any): Promise<any>;
    sign(callbackUrl: any): Promise<any>;
}
export default Authorize;
