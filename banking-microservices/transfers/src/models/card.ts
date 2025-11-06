import { CardColor, CardType, PaymentSystem } from "@ynbanking/common";
import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";


interface CardAttrs {
  id: string;
  number: number;
  type: CardType;
  payment_system: PaymentSystem;
  color: CardColor;
  balance: number;
  userId: string;
}

export interface CardDoc extends mongoose.Document {
  number: number;
  type: CardType;
  payment_system: PaymentSystem;
  color: CardColor;
  balance: number;
  userId: string;
  version: number;
}

interface CardModel extends mongoose.Model<CardDoc> {
  build(attrs: CardAttrs): CardDoc;
  findByEvent(event: { id: string, version: number }): Promise<CardDoc | null>
}

const cardSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: Object.values(CardType),
    required: true
  },
  payment_system: {
    type: String,
    enum: Object.values(PaymentSystem),
    required: true
  },
  color: {
    type: String,
    enum: Object.values(CardColor),
    required: true
  },
  balance: {
    type: Number,
    required: true,
    default: 0
  },
  userId: {
    type: String,
    required: true
  }
},
{
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    }
  }
}
);

cardSchema.set('versionKey', 'version');

cardSchema.plugin(updateIfCurrentPlugin);

cardSchema.statics.findByEvent = (event: { id: string, version: number}) => {
  return Card.findOne({
    _id: event.id,
    version: event.version - 1
  });
};

cardSchema.statics.build = (attrs: CardAttrs) => {
  return new Card({
    _id: attrs.id,
    number: attrs.number,
    type: attrs.type,
    payment_system: attrs.payment_system,
    color: attrs.color,
    balance: attrs.balance,
    userId: attrs.userId
  });
};

const Card = mongoose.model<CardDoc, CardModel>('Card', cardSchema);

export { Card };