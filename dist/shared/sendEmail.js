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
const boom_1 = require("@hapi/boom");
const EventGridTopic_1 = require("./libs/EventGridTopic");
const eventGridTopic = new EventGridTopic_1.default('hermod');
function sendEmail(refunds, email) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!email) {
            throw boom_1.notFound('Nenhum e-mail encontrado!');
        }
        const title = refunds.title;
        const owner = refunds.owner;
        console.log(title, owner);
        //   const name = newCustomer.type === 'person' ? newCustomer.personalInfo.name : newCustomer.companyInfo.tradingName;
        // await eventGridTopic.publish('sendEmail', [{
        //     data: {
        //         owner,
        //         title
        //         //   url: `${process.env.HeimdallFrontendBaseUrl}/emailVerification/${token}`
        //     },
        //     subject: 'Novo reembolso para aprovação!',
        //     template: 'heimdall/new-onboarding',
        //     to: email
        // }]);
    });
}
exports.default = sendEmail;
//# sourceMappingURL=sendEmail.js.map