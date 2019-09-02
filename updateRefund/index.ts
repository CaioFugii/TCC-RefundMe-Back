import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { badRequest } from '@hapi/boom';
import { generateResponse } from '../shared/libs/responseHelpers';
import { isValidObjectId } from '../shared/libs/utils';
import connectToMongo from '../shared/libs/connectToMongo';
import requestPipeline from '../shared/libs/requestPipeline';
import { RefundModel } from '../shared/models/Refunds';
const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
      await connectToMongo();
        // console.log(req.body)
      if (req.body.value && req.body.value !== '' && typeof req.body.value !== 'number') {
        let str = req.body.value;
        let n = str.lastIndexOf('$');
        const valor = str.substring(n + 1);
        let aux = valor.replace('.', '');
        req.body.value = parseFloat(aux.replace(',', '.'));
      }
  
      const { id } = req.params;
      if (!isValidObjectId(id)) throw badRequest('ID do grupo é inválido!');
      const refund = await RefundModel.findByIdAndUpdate(id, req.body, { new: true });

      if (!refund) {
        throw new Error('Despesa não encontrada!');
      }
      context.res = generateResponse({ message: 'Despesa atualizada com sucesso!', refund }, 200);
    } catch (error) {
      context.res = generateResponse({ message: 'Erro ao atualizar despesa!', error }, 400);
    }
  };

export default requestPipeline(httpTrigger);