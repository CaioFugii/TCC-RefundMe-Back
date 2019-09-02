import {
    prop as Property,
    arrayProp as ArrayProp,
    staticMethod as StaticMethod,
    Typegoose,
    Ref
  } from 'typegoose';
  
  import { Expense } from './Expense';
  import { ObjectId } from 'mongodb'
  
    
  export const StatusEnum = {
    PENDING: 'pendente aprovação',
    APPROVED: 'aprovado',
    REPROVED: 'reprovado',
    CANCELED: 'cancelado',
    WAITING_PAYMENT: 'pendente pagamento',
    PAID: 'pago'
  }
  
  class Owner {
    @Property()
    public _id: string;
  
    @Property({ required: true })
    public name: string;
  
    @Property({ required: true })
    public email: string;
  }

  class PersonInCharge {
    @Property()
    public _id: string;
  
    @Property({ required: true })
    public name: string;
  
    @Property({ required: true })
    public email: string;
  }
  
  export class Refund extends Typegoose {
  
    @Property({ required: true })
    public title: string;

    @Property()
    public datePayment?: Date;
  
    @Property({ required: true })
    public personInCharge: PersonInCharge;

    @Property()
    public owner: Owner;
  
    @Property({ enum: StatusEnum, default: 'pendente aprovação' })
    public status: string;

    @ArrayProp({ itemsRef: Expense })
    public refunds: Ref<Expense>[];
  
  }
  
  export const RefundModel =
    new Refund().getModelForClass(Refund, { schemaOptions: { collection: 'Refunds', timestamps: true } });