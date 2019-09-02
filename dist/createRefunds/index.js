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
const utils_1 = require("../shared/libs/utils");
const boom_1 = require("@hapi/boom");
const Refunds_1 = require("../shared/models/Refunds");
const Expense_1 = require("../shared/models/Expense");
const responseHelpers_1 = require("../shared/libs/responseHelpers");
const httpTrigger = function (context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connectToMongo_1.default();
            // console.log(req.body);
            const refund = yield new Refunds_1.RefundModel(req.body);
            const refunds = req.body.refunds;
            yield refund.save();
            refunds.map((item) => __awaiter(this, void 0, void 0, function* () {
                if (!utils_1.isValidObjectId(item))
                    throw boom_1.default('ID do grupo é inválido!');
                yield Expense_1.ExpenseModel.findByIdAndUpdate(item, { status: 'Reembolso solicitado' }, { new: true });
            }));
            context.res = responseHelpers_1.generateResponse({ message: `Reembolso criado com sucesso!` }, 200);
        }
        catch (error) {
            context.res = responseHelpers_1.generateResponse({ message: `Erro ao criar reembolso!`, error }, 400);
        }
    });
};
exports.default = httpTrigger;
//# sourceMappingURL=index.js.map