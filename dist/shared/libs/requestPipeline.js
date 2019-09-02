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
const responseHelpers_1 = require("./responseHelpers");
function requestPipeline(...functions) {
    return function (context, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const f of functions) {
                try {
                    yield f(context, ...args);
                }
                catch (error) {
                    context.res = responseHelpers_1.handleError(error, context.log);
                }
                if (context.res && !(context.res.status instanceof Function)) {
                    break;
                }
            }
        });
    };
}
exports.default = requestPipeline;
//# sourceMappingURL=requestPipeline.js.map