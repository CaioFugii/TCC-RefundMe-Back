import { notFound } from '@hapi/boom';
import EventGridTopic from './libs/EventGridTopic';


const eventGridTopic = new EventGridTopic('hermod');

export default async function sendEmail(refunds: any, email: string) {

    if (!email) {
        throw notFound('Nenhum e-mail encontrado!');
    }

    const title = refunds.title
    const owner = refunds.owner
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
}
