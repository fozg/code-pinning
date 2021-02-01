export declare class OnePointAPI {
    private baseUrl;
    private accessToken;
    constructor(baseUrl: string, accessToken: string);
    private doAction;
    action(action: string): {
        payload: (payload: any) => {
            call: () => Promise<any>;
        };
        call: () => Promise<any>;
    };
}
