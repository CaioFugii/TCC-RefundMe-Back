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
const azureStorage = require("azure-storage");
const responseHelpers_1 = require("../shared/libs/responseHelpers");
const httpTrigger = function (context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const blobService = azureStorage.createBlobService('DefaultEndpointsProtocol=https;AccountName=storageallinvestx;AccountKey=ZknKZF3V8lWk+M6+V2Q3KknpeVkxEquUqPHxf8sF0D2vZa/wjXusZPCRcXk5KAtRgqOAZ6ETEh1zOBh87LA1Qw==;EndpointSuffix=core.windows.net');
            const blobName = req.params.file + Math.random();
            const res = blobService.generateSharedAccessSignature('stark-receipt', blobName, {
                AccessPolicy: {
                    Permissions: "rwdl",
                    Expiry: getDate()
                }
            });
            function getDate() {
                var date = new Date();
                date.setHours((date).getHours() + 1);
                return date;
            }
            const account = "storageallinvestx";
            const containerName = 'stark-receipt';
            const url = `https://${account}.blob.core.windows.net/${containerName}/${blobName}?` + res;
            context.res = responseHelpers_1.generateResponse(url, 200);
        }
        catch (error) {
            context.res = responseHelpers_1.generateResponse({ data: error }, 400);
        }
    });
};
exports.default = httpTrigger;
//# sourceMappingURL=index.js.map