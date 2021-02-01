"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnePoint_Actions = exports.useFetch = void 0;
const OnePointSDK_1 = require("./OnePointSDK");
const useFetch_1 = __importDefault(require("./useFetch"));
exports.useFetch = useFetch_1.default;
exports.default = OnePointSDK_1.OnePoint;
var action_define_1 = require("./action.define");
Object.defineProperty(exports, "OnePoint_Actions", { enumerable: true, get: function () { return action_define_1.OnePoint_Actions; } });
//# sourceMappingURL=index.js.map