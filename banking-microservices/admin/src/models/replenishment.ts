import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface ReplenishmentAttrs {
  id: string;
  cardId: string;
  userId: string;
  amount: number;
  approved: boolean;
  date: Date;
}

export interface ReplenishmentDoc extends mongoose.Document {
  cardId: string;
  userId: string;
  amount: number;
  approved: boolean;
  date: Date;
  version: number;
}

interface ReplenishmentModel extends mongoose.Model<ReplenishmentDoc> {
  build(attrs: ReplenishmentAttrs): ReplenishmentDoc;
  findByEvent(event: { id: string, version: number }): Promise<ReplenishmentDoc | null>
}

const replenishmentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  cardId: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  approved: {
    type: Boolean,
    required: true,
    default: false
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

replenishmentSchema.set('versionKey', 'version');

replenishmentSchema.plugin(updateIfCurrentPlugin);

replenishmentSchema.statics.findByEvent = (event: { id: string, version: number}) => {
  return Replenishment.findOne({
    _id: event.id,
    version: event.version - 1
  });
};

replenishmentSchema.statics.build = (attrs: ReplenishmentAttrs) => {
  return new Replenishment({
    _id: attrs.id,
    cardId: attrs.cardId,
    userId: attrs.userId,
    amount: attrs.amount,
    approved: attrs.approved,
    date: attrs.date
  });
};

const Replenishment = mongoose.model<ReplenishmentDoc, ReplenishmentModel>('Replenishment', replenishmentSchema);

export { Replenishment };