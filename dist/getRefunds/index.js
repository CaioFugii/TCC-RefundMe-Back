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
const connectToMongo_1 = require("../shared/libs/connectToMongo");
const responseHelpers_1 = require("../shared/libs/responseHelpers");
const requestPipeline_1 = require("../shared/libs/requestPipeline");
const mongoQueryGenerator_1 = require("../shared/libs/middlewares/mongoQueryGenerator");
const Refunds_1 = require("../shared/models/Refunds");
const httpTrigger = function (context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connectToMongo_1.default();
            const { filter, skip, limit, sort, 
            // projection,
            population } = req.mongoQuery;
            const documentCount = yield Refunds_1.RefundModel.count(filter);
            const responseBody = yield Refunds_1.RefundModel.find(filter)
                .populate(population)
                .sort(sort)
                .skip(skip)
                .limit(limit);
            // .select(projection);
            context.res = responseHelpers_1.generateResponse(responseBody, 200, {
                'Access-Control-Expose-Headers': 'X-Total-Count',
                'X-Total-Count': documentCount
            });
        }
        catch (error) {
            context.res = responseHelpers_1.generateResponse({ message: `Erro ao buscar Reembolsos!`, error }, 400);
        }
    });
};
exports.default = requestPipeline_1.default(mongoQueryGenerator_1.default, httpTrigger);
//# sourceMappingURL=index.js.map