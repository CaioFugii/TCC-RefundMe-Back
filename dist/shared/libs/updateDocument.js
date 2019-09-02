"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function updateDocument(document, updates) {
    Object.keys(updates).forEach((k) => {
        document.set(k, updates[k]);
    });
    return document;
}
exports.default = updateDocument;
//# sourceMappingURL=updateDocument.js.map