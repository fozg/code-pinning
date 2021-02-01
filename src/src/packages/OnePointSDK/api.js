"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnePointAPI = void 0;
const axios_1 = __importDefault(require("axios"));
// OnePointAPI using 200only API
class OnePointAPI {
    constructor(baseUrl, accessToken) {
        this.baseUrl = baseUrl;
        this.accessToken = accessToken;
    }
    doAction(action, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield axios_1.default.post(this.baseUrl + "/twohundred", {
                    action,
                    payload,
                }, {
                    headers: {
                        authorization: `Bearer ${this.accessToken}`
                    }
                });
                return result.data;
            }
            catch (e) {
                return {
                    action,
                    isError: true,
                    message: e.message
                };
            }
        });
    }
    action(action) {
        return {
            payload: (payload) => ({ call: () => this.doAction(action, payload) }),
            call: () => this.doAction(action)
        };
    }
}
exports.OnePointAPI = OnePointAPI;
//# sourceMappingURL=api.js.map