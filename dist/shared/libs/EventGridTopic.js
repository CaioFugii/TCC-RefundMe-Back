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
const azure_eventgrid_1 = require("azure-eventgrid");
const msRestAzure = require("ms-rest-azure");
const url = require("url");
const uuid = require("uuid/v4");
class EventGridTopic {
    constructor(namespace = process.env.EventGridTopicNamespace, endpoint = process.env.EventGridTopicEndpoint, key = process.env.EventGridTopicKey) {
        this.namespace = namespace;
        this.endpoint = endpoint;
        this.key = key;
    }
    publish(event, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const topicCredentials = new msRestAzure.TopicCredentials(this.key);
            const eventGridClient = new azure_eventgrid_1.default(topicCredentials);
            const topicHostName = url.parse(this.endpoint, true).host;
            const currentDate = new Date();
            const events = data.map((d) => ({
                data: d,
                dataVersion: '2.0',
                eventTime: currentDate,
                eventType: `${this.namespace}:${event}`,
                id: uuid(),
                subject: `${this.namespace}:${event}`
            }));
            return yield eventGridClient.publishEvents(topicHostName, events);
        });
    }
}
exports.default = EventGridTopic;
//# sourceMappingURL=EventGridTopic.js.map