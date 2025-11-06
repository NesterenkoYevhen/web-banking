import mongoose from "mongoose";

export enum OperationType {
  Replenishment = 'REPLENISHMENT',
  TransferSender = 'TRANSFER_SENDER',
  TransferRecepient = 'TRANSFER_RECEPIENT'
};

export enum StatusType {
  Conducted = 'CONDUCTED',
  Rejected = 'REJECTED'
}

interface TransactionAttrs {
  cardId: string;
  userId: string;
  senderName?: string;
  senderCardNumber?: number;
  recepientName?: string;
  recepientCardNumber?: number;
  assignment?: string;
  type: OperationType;
  date: Date;
  status: StatusType;
  amount: number;
}

export interface TransactionDoc extends mongoose.Document {
  cardId: string;
  userId: string;
  senderName?: string;
  senderCardNumber?: number;
  recepientName?: string;
  recepientCardNumber?: number;
  assignment?: string;
  type: OperationType;
  date: Date;
  status: StatusType;
  amount: number;
}

interface TransactionModel extends mongoose.Model<TransactionDoc> {
  build(attrs: TransactionAttrs): TransactionDoc;
}

const transactionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  cardId: {
    type: String,
    required: true
  },
  recepientName: {
    type: String
  },
  recepientCardNumber: {
    type: Number
  },
  senderName: {
    type: String
  },
  senderCardNumber: {
    type: Number
  },
  assignment: {
    type: String
  },
  type: {
    type: String,
    enum: Object.values(OperationType),
    required: true
  },
  status: {
    type: String,
    enum: Object.values(StatusType),
    required: true
  },
  date: {
    type: Date,
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

transactionSchema.statics.build = (attrs: TransactionAttrs) => {
  return new Transaction(attrs);
};

const Transaction = mongoose.model<TransactionDoc, TransactionModel>('Transaction', transactionSchema);

export { Transaction };