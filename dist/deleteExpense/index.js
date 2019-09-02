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
const responseHelpers_1 = require("../shared/libs/responseHelpers");
const Expense_1 = require("../shared/models/Expense");
const httpTrigger = function (context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connectToMongo_1.default();
            const { id } = req.params;
            if (!utils_1.isValidObjectId(id)) {
                throw boom_1.badRequest('ID da despesa inválido');
            }
            const expense = yield Expense_1.ExpenseModel.findById(id);
            if (expense === null) {
                context.res = responseHelpers_1.generateResponse({ message: 'Nenhuma despesa foi encontrada com o ID fornecido' }, 404);
                return;
            }
            const result = yield Expense_1.ExpenseModel.findByIdAndRemove(id);
            if (result) {
                context.res = responseHelpers_1.generateResponse({ message: 'Despesa removida com sucesso' }, 200);
            }
            else {
                throw result;
            }
        }
        catch (error) {
            context.res = responseHelpers_1.generateResponse({ message: 'Problemas ao remover a despesa selecionada', error }, 400);
        }
    });
};
exports.default = httpTrigger;
//# sourceMappingURL=index.js.map