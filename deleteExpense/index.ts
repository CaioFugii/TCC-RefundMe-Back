import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import connectToMongo from "../shared/libs/connectToMongo";
import { isValidObjectId } from "../shared/libs/utils";
import { badRequest } from "@hapi/boom";
import { generateResponse } from "../shared/libs/responseHelpers";
import { ExpenseModel } from "../shared/models/Expense";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  try {
    await connectToMongo();

    const { id } = req.params;                                     
    
    if (!isValidObjectId(id)) {
      throw badRequest('ID da despesa inválido');
    }

    const expense = await ExpenseModel.findById(id);

    if (expense === null) {
      context.res = generateResponse({ message: 'Nenhuma despesa foi encontrada com o ID fornecido' }, 404);
      return;
    }

    const result = await ExpenseModel.findByIdAndRemove(id);

    if (result) {
      context.res = generateResponse({ message: 'Despesa removida com sucesso' }, 200);
    } else {
      throw result
    }
  } catch (error) {
    context.res = generateResponse({ message: 'Problemas ao remover a despesa selecionada', error }, 400);
  }
};

export default httpTrigger;