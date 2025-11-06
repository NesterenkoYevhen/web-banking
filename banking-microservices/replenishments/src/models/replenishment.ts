import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface ReplenishmentAttrs {
  cardId: string;
  userId: string;
  amount: number;
}

export interface ReplenishmentDoc extends mongoose.Document {
  cardId: string;
  userId: string;
  amount: number;
  approved: boolean;
  version: number;
}

interface ReplenishmentModel extends mongoose.Model<ReplenishmentDoc> {
  build(attrs: ReplenishmentAttrs): ReplenishmentDoc;
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

replenishmentSchema.statics.build = (attrs: ReplenishmentAttrs) => {
  return new Replenishment(attrs);
};

const Replenishment = mongoose.model<ReplenishmentDoc, ReplenishmentModel>('Replenishment', replenishmentSchema);

export { Replenishment };