export declare class ClientInfo {
    private clientId;
    private env;
    private lang;
    defaultAccount: string;
    constructor(clientId: any, env: any, lang?: string);
    get baseUrl(): string;
    getClientInfo(): Promise<any>;
}
export default ClientInfo;
