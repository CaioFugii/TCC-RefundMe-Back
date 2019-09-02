"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const boom = require("@hapi/boom");
function generateResponse(body, status = 200, additionalHeaders = {}) {
    if (body && status !== 204) {
        return {
            body,
            headers: Object.assign({ 'Content-Type': body instanceof String ? 'text/plain' : 'application/json' }, additionalHeaders),
            status
        };
    }
    return { status };
}
exports.generateResponse = generateResponse;
function handleError(error, logger) {
    let body;
    // ValidationError do Mongoose
    if (error && error.name === 'ValidationError') {
        body = boom.boomify(error, { statusCode: 400 });
    }
    else {
        body = boom.boomify(error);
        logger.error(error);
        if (process.env.NODE_ENV === 'development') {
            body.output.payload = Object.assign({}, body.output.payload, { message: error.message, stack: error.stack });
        }
    }
    return this.generateResponse(body.output.payload, body.output.statusCode);
}
exports.handleError = handleError;
//# sourceMappingURL=responseHelpers.js.map