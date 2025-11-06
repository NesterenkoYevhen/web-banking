import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { CardColor, CardType, PaymentSystem } from "@ynbanking/common";

interface CardAttrs {
  number: number;
  type: CardType;
  payment_system: PaymentSystem;
  color: CardColor;
  userId: string;
  online_limit?: number;
  offline_limit?: number;
}

interface CardDoc extends mongoose.Document {
  number: number;
  type: CardType;
  payment_system: PaymentSystem;
  color: CardColor;
  balance: number;
  userId: string;
  version: number;
  online_limit: number;
  offline_limit: number;
}

interface CardModel extends mongoose.Model<CardDoc> {
  build(attrs: CardAttrs): CardDoc;
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
  },
  online_limit: {
    type: Number,
    required: true,
    default: 1000000
  },
  offline_limit: {
    type: Number,
    required: true,
    default: 1000000
  }
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id
    }
  }
});

cardSchema.set('versionKey', 'version');
cardSchema.plugin(updateIfCurrentPlugin);

cardSchema.statics.build = (attrs: CardAttrs) => {
  return new Card(attrs);
};

const Card = mongoose.model<CardDoc, CardModel>('Card', cardSchema);

export { Card };