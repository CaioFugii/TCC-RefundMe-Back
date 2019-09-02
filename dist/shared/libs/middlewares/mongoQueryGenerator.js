"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const aqp = require('api-query-params');
const url = require("url");
function mongoQueryGenerator(context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        const parsedUrl = url.parse(req.url);
        if (parsedUrl.search) {
            req.mongoQuery = aqp(parsedUrl.search.substring(1));
        }
        req.mongoQuery = req.mongoQuery || { filter: {}, projection: {}, sort: {}, skip: 0, limit: 1000, population: {} };
    });
}
exports.default = mongoQueryGenerator;
;
//# sourceMappingURL=mongoQueryGenerator.js.map