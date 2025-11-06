import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface TransferAttrs {
  senderName: string;
  senderCardNumber: number;
  recepientName: string;
  recepientCardNumber: number;
  assignment: string;
  amount: number;
}

export interface TransferDoc extends mongoose.Document {
  senderName: string;
  senderCardNumber: number;
  recepientName: string;
  recepientCardNumber: number;
  assignment: string;
  amount: number;
  version: number;
}

interface TransferModel extends mongoose.Model<TransferDoc> {
  build(attrs: TransferAttrs): TransferDoc;
}

const transferSchema = new mongoose.Schema({
  senderName: {
    type: String,
    required: true
  },
  senderCardNumber: {
    type: Number,
    required: true
  },
  recepientName: {
    type: String,
    required: true
  },
  recepientCardNumber: {
    type: Number,
    required: true
  },
  assignment: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
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

transferSchema.set('versionKey', 'version');

transferSchema.plugin(updateIfCurrentPlugin);

transferSchema.statics.build = (attrs: TransferAttrs) => {
  return new Transfer(attrs);
};

const Transfer = mongoose.model<TransferDoc, TransferModel>('Transfer', transferSchema);

export { Transfer };