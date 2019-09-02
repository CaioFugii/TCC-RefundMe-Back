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
const Expense_1 = require("../shared/models/Expense");
const responseHelpers_1 = require("../shared/libs/responseHelpers");
const httpTrigger = function (context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connectToMongo_1.default();
            let str = req.body.value;
            let n = str.lastIndexOf("$");
            const valor = str.substring(n + 1);
            let aux = valor.replace(".", "");
            req.body.value = parseFloat(aux.replace(",", "."));
            console.log(req.body);
            // req.body.owner._id = req.body.owner.id
            const expense = yield new Expense_1.ExpenseModel(req.body);
            // console.log(expense);
            yield expense.save();
            context.res = responseHelpers_1.generateResponse({ message: `Criado com sucesso!` }, 200);
        }
        catch (error) {
            context.res = responseHelpers_1.generateResponse({ message: `Erro ao criar expense!`, error }, 400);
        }
    });
};
exports.default = httpTrigger;
//# sourceMappingURL=index.js.map