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
const Refunds_1 = require("../shared/models/Refunds");
const httpTrigger = function (context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connectToMongo_1.default();
            const refunds = req.body.refunds;
            const approvedOrRepproved = req.body.approved == true ? 'aprovado' : 'reprovado';
            refunds.map(item => {
                item.map((subItem) => __awaiter(this, void 0, void 0, function* () {
                    if (!utils_1.isValidObjectId(subItem._id))
                        throw boom_1.default('ID do grupo é inválido!');
                    yield Refunds_1.RefundModel.findByIdAndUpdate(subItem._id, { status: approvedOrRepproved }, { new: true });
                    // subItem.refunds.map(async (subsubItem) => {// Neste map estou entrando DESPESA POR DESPESA E ATUALIZANDO O STATUS (APROVADO OU REPROVADO)
                    //     if (!isValidObjectId(subsubItem._id)) throw badRequest('ID do grupo é inválido!');
                    //     await ExpenseModel.findByIdAndUpdate(subsubItem._id, { status: approvedOrRepproved }, { new: true })
                    // })
                }));
            });
            context.res = responseHelpers_1.generateResponse({ message: `Atualizado com sucesso!` }, 200);
        }
        catch (error) {
            context.res = responseHelpers_1.generateResponse({ message: `Erro ao atualizar reembolso!`, error }, 400);
        }
    });
};
exports.default = httpTrigger;
//# sourceMappingURL=index.js.map