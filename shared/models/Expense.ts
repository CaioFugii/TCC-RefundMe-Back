import {
  prop as Property,
  arrayProp as ArrayProp,
  staticMethod as StaticMethod,
  Typegoose,
} from 'typegoose';

import { ObjectId } from 'mongodb'



type StatusType = 'Em aberto' | 'Reembolso solicitado';

export const StatusEnum = {
  OPENED: 'Em aberto',
  REFUND_REQUESTED: 'Reembolso solicitado'
}

class Owner {
  @Property({ required: true })
  public _id: string;

  @Property()
  public name: string;

  @Property()
  public email: string;
}

export class Expense extends Typegoose {


  @Property({ enum: StatusEnum, default: 'Em aberto' })
  public status: StatusType;

  @Property({ required: true })
  public classification: string;

  @Property({ required: true })
  public date: Date;

  @Property()
  public file: string;

  @Property({ required: true })
  public value: number;

  @Property()
  public owner: Owner;

}

export const ExpenseModel =
  new Expense().getModelForClass(Expense, { schemaOptions: { collection: 'Expenses', timestamps: true } });