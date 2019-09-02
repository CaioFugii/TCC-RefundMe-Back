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
const Expense_1 = require("../shared/models/Expense");
const httpTrigger = function (context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connectToMongo_1.default();
            const { filter, skip, limit, sort, 
            // projection,
            population } = req.mongoQuery;
            // console.log(filter);
            const documentCount = yield Expense_1.ExpenseModel.count(filter);
            // const query = {'owner._id':'5d3b693b73d59710d4c07166', 'owner.id':'5d3b693b73d59710d4c07166'}
            // console.log(query);
            const responseBody = yield Expense_1.ExpenseModel.find(filter)
                .populate(population)
                .sort(sort)
                .skip(skip)
                .limit(limit);
            // .select(projection);
            // console.log(responseBody)
            context.res = responseHelpers_1.generateResponse(responseBody, 200, {
                'Access-Control-Expose-Headers': 'X-Total-Count',
                'X-Total-Count': documentCount
            });
        }
        catch (error) {
            context.res = responseHelpers_1.generateResponse({ message: `Erro ao buscar Despesas!`, error }, 400);
        }
    });
};
exports.default = requestPipeline_1.default(mongoQueryGenerator_1.default, httpTrigger);
//# sourceMappingURL=index.js.map