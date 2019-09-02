import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import connectToMongo from "../shared/libs/connectToMongo";
import { isValidObjectId } from '../shared/libs/utils'
import badRequest from "@hapi/boom"
import { RefundModel } from "../shared/models/Refunds";
import { ExpenseModel } from '../shared/models/Expense'
import { generateResponse } from "../shared/libs/responseHelpers";
import * as mongoose from 'mongoose';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  try {
    await connectToMongo();
    // console.log(req.body);
    const refund = await new RefundModel(req.body);
    const refunds = req.body.refunds

    await refund.save();

    refunds.map(async (item) => {
      if (!isValidObjectId(item)) throw badRequest('ID do grupo é inválido!');
      await ExpenseModel.findByIdAndUpdate(item, { status: 'Reembolso solicitado' }, { new: true })
    })

    context.res = generateResponse({ message: `Reembolso criado com sucesso!` }, 200);
  } catch (error) {
    context.res = generateResponse({ message: `Erro ao criar reembolso!`, error }, 400);
  }
};

export default httpTrigger;
