import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import connectToMongo from "../shared/libs/connectToMongo";
import { isValidObjectId } from "../shared/libs/utils";
import { badRequest } from "@hapi/boom";
import { generateResponse } from "../shared/libs/responseHelpers";
import { RefundModel } from "../shared/models/Refunds";
import { ExpenseModel } from "../shared/models/Expense";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  try {
    await connectToMongo();

    const { id } = req.params;                                     
    
    if (!isValidObjectId(id)) {
      throw badRequest('ID da despesa inválido');
    }

    const refund = await RefundModel.findById(id);
    // console.log(refund);
    if (refund === null) {
      context.res = generateResponse({ message: 'Nenhum reembolso foi encontrado com o ID fornecido' }, 404);
      return;
    }

    refund.refunds.map(async(item) =>{
        if (!isValidObjectId(item._id)) throw badRequest('ID do grupo é inválido!');
        await ExpenseModel.findByIdAndUpdate(item._id, { status: 'Em aberto' }, { new: true })
    } )

    const result = await RefundModel.findByIdAndRemove(id);

    if (result) {
      context.res = generateResponse({ message: 'Reembolso removido com sucesso' }, 200);
    } else {
      throw result
    }
  } catch (error) {
    context.res = generateResponse({ message: 'Problemas ao remover o reembolso selecionado', error }, 400);
  }
};

export default httpTrigger;