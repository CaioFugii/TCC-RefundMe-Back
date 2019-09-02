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
const mongoose = require("mongoose");
function connectToMongo(
// connectionString: string = process.env.MongoConnectionString,
// autoIndex: boolean = JSON.parse(process.env.MongoAutoIndex)
connectionString = "mongodb://db-stark-dev:IFp24MKJbukis60Xzzo2M6Uf6irl18Xr3yaJvh1txPzGOE4xdk6tnNz89R9IZuxt7xZg1dtQBLCieGanve8rrA==@db-stark-dev.documents.azure.com:10255/stark?ssl=true&replicaSet=globaldb", autoIndex = true) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!mongoose.connection || !mongoose.connection.readyState) {
            yield mongoose.connect(connectionString, {
                autoIndex,
                useCreateIndex: true,
                useNewUrlParser: true,
                useFindAndModify: false
            });
        }
        return mongoose.connection;
    });
}
exports.default = connectToMongo;
//# sourceMappingURL=connectToMongo.js.map