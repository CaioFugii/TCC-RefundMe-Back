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
const boom_1 = require("@hapi/boom");
const responseHelpers_1 = require("../shared/libs/responseHelpers");
const utils_1 = require("../shared/libs/utils");
const connectToMongo_1 = require("../shared/libs/connectToMongo");
const requestPipeline_1 = require("../shared/libs/requestPipeline");
const Refunds_1 = require("../shared/models/Refunds");
const httpTrigger = (context, req) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield connectToMongo_1.default();
        // console.log(req.body)
        if (req.body.value && req.body.value !== '' && typeof req.body.value !== 'number') {
            let str = req.body.value;
            let n = str.lastIndexOf('$');
            const valor = str.substring(n + 1);
            let aux = valor.replace('.', '');
            req.body.value = parseFloat(aux.replace(',', '.'));
        }
        const { id } = req.params;
        if (!utils_1.isValidObjectId(id))
            throw boom_1.badRequest('ID do grupo é inválido!');
        const refund = yield Refunds_1.RefundModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!refund) {
            throw new Error('Despesa não encontrada!');
        }
        context.res = responseHelpers_1.generateResponse({ message: 'Despesa atualizada com sucesso!', refund }, 200);
    }
    catch (error) {
        context.res = responseHelpers_1.generateResponse({ message: 'Erro ao atualizar despesa!', error }, 400);
    }
});
exports.default = requestPipeline_1.default(httpTrigger);
//# sourceMappingURL=index.js.map