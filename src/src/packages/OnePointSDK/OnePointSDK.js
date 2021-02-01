"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnePoint = exports.App = void 0;
const api_1 = require("./api");
const action_define_1 = require("./action.define");
const DEVELOPMENT_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiZm96ZyIsIm5hbWUiOiJQaG9uZyIsImF2YXRhcl91cmwiOiJodHRwczovL2F2YXRhcnMzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzM3MDE1MTY4P3M9NDYwJnY9NCJ9LCJpYXQiOjE2MTE5NDEyMTV9.IX0yKq8I2WKz7KiZSA3Wr6CHmofxNO7AbHWrFDAVP0o`;
const LOCALSTORAGE_TOKEN_KEY = "token";
const DEVELOPMENT_ENDPOINT = `http://localhost:3003`;
const PRODUCTION_ENDPOINT = `https://fozg.net/opapi`;
class Base {
    constructor(onePointAPI) {
        this.onePointAPI = onePointAPI;
    }
    doAction({ action, payload }) {
        return this.onePointAPI.action(action).payload(payload).call();
    }
}
class List extends Base {
    constructor(appName, listName, onePointAPI) {
        super(onePointAPI);
        this.listName = listName;
        this.appName = appName;
    }
    addItem(item) {
        return this.doAction({
            action: action_define_1.OnePoint_Actions.CREATE_LIST_ITEM,
            payload: {
                appName: this.appName,
                listName: this.listName,
                item: item,
            },
        });
    }
    getItemById(itemId) { }
    getItemByName(itemName) { }
    getItems(filter = []) {
        return this.doAction({
            action: action_define_1.OnePoint_Actions.GET_LIST_ITEMS,
            payload: {
                appName: this.appName,
                listName: this.listName,
                filter,
            },
        });
    }
    updateItem(itemId, item) { }
    deleteItem(itemId) {
        return this.doAction({
            action: action_define_1.OnePoint_Actions.DELETE_LIST_ITEM,
            payload: {
                listName: this.listName,
                appName: this.appName,
                itemId
            }
        });
    }
    shareItem(itemId) { }
}
class App extends Base {
    constructor(appName, onePointAPI) {
        super(onePointAPI);
        this.appName = appName;
    }
    addList(displayName, name) {
        return this.doAction({
            action: action_define_1.OnePoint_Actions.CREATE_LIST,
            payload: {
                appName: this.appName,
                name,
                displayName,
            }
        });
    }
    getListByName(listName) {
        return new List(this.appName, listName, this.onePointAPI);
    }
    getLists() {
        return this.doAction({ action: action_define_1.OnePoint_Actions.GET_LISTS_BY_APP, payload: { appName: this.appName } });
    }
}
exports.App = App;
class OnePoint {
    constructor(endpoint, accessToken) {
        this.endpoint = process.env.NODE_ENV === "development" ? DEVELOPMENT_ENDPOINT : PRODUCTION_ENDPOINT;
        this.accessToken = this.getAccessTokenFromLocalStorage();
        if (endpoint) {
            this.endpoint = endpoint;
        }
        if (accessToken) {
            this.accessToken = accessToken;
        }
        this.onePointAPI = new api_1.OnePointAPI(this.endpoint, this.accessToken);
    }
    getAccessTokenFromLocalStorage() {
        if (process.env.NODE_ENV === "development")
            return DEVELOPMENT_TOKEN;
        return localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
    }
    getAppByName(appName) {
        return new App(appName, this.onePointAPI);
    }
    getApps() {
        return this.onePointAPI.action(action_define_1.OnePoint_Actions.GET_APPS_BY_USER).payload({}).call();
    }
    createApp(name, displayName) {
        return this.onePointAPI.action(action_define_1.OnePoint_Actions.CREATE_APP).payload({ name, displayName }).call();
    }
    getListInfoById(listId) {
        return this.onePointAPI.action(action_define_1.OnePoint_Actions.GET_LIST_BY_ID).payload({ listId }).call();
    }
    quickAction(action, payload) {
        return this.onePointAPI.action(action).payload(payload).call();
    }
}
exports.OnePoint = OnePoint;
//# sourceMappingURL=OnePointSDK.js.map