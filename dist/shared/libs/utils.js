"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const isValidObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
};
exports.isValidObjectId = isValidObjectId;
//# sourceMappingURL=utils.js.map