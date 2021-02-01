import { OnePointAPI } from "./api";
import { OnePoint_Actions } from "./action.define";
declare type ItemFilter = {};
declare class Base {
    protected onePointAPI: OnePointAPI;
    constructor(onePointAPI: OnePointAPI);
    protected doAction({ action, payload }: {
        action: OnePoint_Actions;
        payload: any;
    }): Promise<any>;
}
declare class List extends Base {
    private listName;
    private appName;
    constructor(appName: string, listName: string, onePointAPI: OnePointAPI);
    addItem(item: any): Promise<any>;
    getItemById(itemId: string): void;
    getItemByName(itemName: string): void;
    getItems(filter?: ItemFilter): Promise<any>;
    updateItem(itemId: string, item: any): void;
    deleteItem(itemId: string): Promise<any>;
    shareItem(itemId: string): void;
}
export declare class App extends Base {
    private appName;
    constructor(appName: string, onePointAPI: OnePointAPI);
    addList(displayName: string, name: string): Promise<any>;
    getListByName(listName: string): List;
    getLists(): Promise<any>;
}
export declare class OnePoint {
    private endpoint;
    private onePointAPI;
    private accessToken;
    constructor(endpoint?: string, accessToken?: string);
    private getAccessTokenFromLocalStorage;
    getAppByName(appName: string): App;
    getApps(): Promise<any>;
    createApp(name: string, displayName: string): Promise<any>;
    getListInfoById(listId: string): Promise<any>;
    quickAction(action: OnePoint_Actions, payload: any): Promise<any>;
}
export {};
