import mongoose from 'mongoose';
import { Password } from '../services/password';
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { Roles } from '@ynbanking/common';

export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE',
  Other = 'OTHER'
};

interface UserAttrs {
  email: string;
  password: string;
  name: string;
  surname: string
  gender: string;
  age: number;
  role?: Roles;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
  id: string;
  email: string;
  password: string;
  name: string;
  surname: string
  gender: string;
  age: number;
  version: number;
  role: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    surname: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      enum: Object.values(Gender),
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    role: {
      type: String,
      required: true,
      enum: Object.values(Roles),
      default: Roles.User   
    }
  }, 
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      }
    }
  }
);

userSchema.set('versionKey', 'version');
userSchema.plugin(updateIfCurrentPlugin);

userSchema.pre('save', async function(done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }

  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };