import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import connectToMongo from '../shared/libs/connectToMongo';
import { generateResponse } from '../shared/libs/responseHelpers';
import requestPipeline from '../shared/libs/requestPipeline';
import mongoQueryGenerator from '../shared/libs/middlewares/mongoQueryGenerator';
import { RefundModel } from '../shared/models/Refunds';

const httpTrigger: AzureFunction = async function (
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
        
        const documentCount: number = await RefundModel.count(filter);

        const responseBody = await RefundModel.find(filter)
            .populate(population)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            // .select(projection);

        context.res = generateResponse(responseBody, 200, {
            'Access-Control-Expose-Headers': 'X-Total-Count',
            'X-Total-Count': documentCount
        });
    } catch (error) {
        context.res = generateResponse(
            { message: `Erro ao buscar Reembolsos!`, error },
            400
        );
    }
};

export default requestPipeline(mongoQueryGenerator, httpTrigger);