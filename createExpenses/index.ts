import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import connectToMongo from "../shared/libs/connectToMongo";
import { ExpenseModel } from "../shared/models/Expense";
import { generateResponse } from "../shared/libs/responseHelpers";
import * as mongoose from 'mongoose';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  try {
    await connectToMongo();

    let str = req.body.value;
    let n = str.lastIndexOf("$");
    const valor = str.substring(n + 1);
    let aux = valor.replace(".", "")
    req.body.value = parseFloat(aux.replace(",","."));

    console.log(req.body);
    // req.body.owner._id = req.body.owner.id

    const expense = await new ExpenseModel(req.body);
    // console.log(expense);
    await expense.save();

    context.res = generateResponse({ message: `Criado com sucesso!` }, 200);
  } catch (error) {
    context.res = generateResponse({ message: `Erro ao criar expense!`, error }, 400);
  }
};

export default httpTrigger;
