import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import * as azureStorage from 'azure-storage'
import { generateResponse } from "../shared/libs/responseHelpers";


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        const blobService = azureStorage.createBlobService(process.env.StorageConnectionString);
        const blobName = req.params.file + Math.random()


        const res = blobService.generateSharedAccessSignature('receipt',blobName , {
            AccessPolicy: {
                Permissions: "rwdl",
                Expiry: getDate()
            }
        })

        function getDate() {
            var date = new Date();
            date.setHours((date).getHours() + 1);
            return date;
        }
        const account = "apirefundme";
        const containerName = 'receipt';
        
        const url = `https://${account}.blob.core.windows.net/${containerName}/${blobName}?` + res

        context.res = generateResponse( url , 200);

    } catch (error) {
        context.res = generateResponse({ data: error }, 400)
    }
};

export default httpTrigger;
