"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typegoose_1 = require("typegoose");
const Expense_1 = require("./Expense");
exports.StatusEnum = {
    PENDING: 'pendente aprovação',
    APPROVED: 'aprovado',
    REPROVED: 'reprovado',
    CANCELED: 'cancelado',
    WAITING_PAYMENT: 'pendente pagamento',
    PAID: 'pago'
};
class Owner {
}
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Owner.prototype, "_id", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], Owner.prototype, "name", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], Owner.prototype, "email", void 0);
class PersonInCharge {
}
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], PersonInCharge.prototype, "_id", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], PersonInCharge.prototype, "name", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], PersonInCharge.prototype, "email", void 0);
class Refund extends typegoose_1.Typegoose {
}
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], Refund.prototype, "title", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Date)
], Refund.prototype, "datePayment", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", PersonInCharge)
], Refund.prototype, "personInCharge", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Owner)
], Refund.prototype, "owner", void 0);
__decorate([
    typegoose_1.prop({ enum: exports.StatusEnum, default: 'pendente aprovação' }),
    __metadata("design:type", String)
], Refund.prototype, "status", void 0);
__decorate([
    typegoose_1.arrayProp({ itemsRef: Expense_1.Expense }),
    __metadata("design:type", Array)
], Refund.prototype, "refunds", void 0);
exports.Refund = Refund;
exports.RefundModel = new Refund().getModelForClass(Refund, { schemaOptions: { collection: 'Refunds', timestamps: true } });
//# sourceMappingURL=Refunds.js.map