import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import connectToMongo from "../shared/libs/connectToMongo";
import { isValidObjectId } from "../shared/libs/utils";
import badRequest from "@hapi/boom"
import { ExpenseModel } from "../shared/models/Expense";
import { generateResponse } from "../shared/libs/responseHelpers";
import { RefundModel } from "../shared/models/Refunds";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        await connectToMongo();
        const refunds = req.body.refunds
        const approvedOrRepproved = req.body.approved == true ? 'aprovado' : 'reprovado'
        refunds.map(item => {
            item.map(async (subItem) => { // Neste map estou entrando REEMBOLSO POR REEMBOLSO E ATUALIZANDO O STATUS (APROVADO OU REPROVADO)
                if (!isValidObjectId(subItem._id)) throw badRequest('ID do grupo é inválido!');
                await RefundModel.findByIdAndUpdate(subItem._id, { status: approvedOrRepproved }, { new: true })
                    // subItem.refunds.map(async (subsubItem) => {// Neste map estou entrando DESPESA POR DESPESA E ATUALIZANDO O STATUS (APROVADO OU REPROVADO)
                    //     if (!isValidObjectId(subsubItem._id)) throw badRequest('ID do grupo é inválido!');
                    //     await ExpenseModel.findByIdAndUpdate(subsubItem._id, { status: approvedOrRepproved }, { new: true })
                // })
            })
        })
        context.res = generateResponse({ message: `Atualizado com sucesso!` }, 200);
    } catch (error) {
        context.res = generateResponse({ message: `Erro ao atualizar reembolso!`, error }, 400);
    }
};

export default httpTrigger;
