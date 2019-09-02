import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import connectToMongo from '../shared/libs/connectToMongo';
import { generateResponse } from '../shared/libs/responseHelpers';
import requestPipeline from '../shared/libs/requestPipeline';
import mongoQueryGenerator from '../shared/libs/middlewares/mongoQueryGenerator';
import { ExpenseModel } from '../shared/models/Expense';

const httpTrigger: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    await connectToMongo();
    const {
      filter,
      skip,
      limit,
      sort,
      // projection,
      population
    } = req.mongoQuery;
// console.log(filter);
    const documentCount: number = await ExpenseModel.count(filter);
// const query = {'owner._id':'5d3b693b73d59710d4c07166', 'owner.id':'5d3b693b73d59710d4c07166'}
// console.log(query);
    const responseBody = await ExpenseModel.find(filter)
      .populate(population)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      // .select(projection);

    // console.log(responseBody)

    context.res = generateResponse(responseBody, 200, {
      'Access-Control-Expose-Headers': 'X-Total-Count',
      'X-Total-Count': documentCount
    });
  } catch (error) {
    context.res = generateResponse(
      { message: `Erro ao buscar Despesas!`, error },
      400
    );
  }
};

export default requestPipeline(mongoQueryGenerator, httpTrigger);
