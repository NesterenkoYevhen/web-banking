import mongoose from 'mongoose';

interface UserAttrs {
  id: string;
  email: string;
  name: string;
  surname: string
  gender: string;
  age: number;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

export interface UserDoc extends mongoose.Document {
  id: string;
  email: string;
  name: string;
  surname: string
  gender: string;
  age: number;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
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
      enum: ['MALE', 'FEMALE', 'OTHER'],
      required: true
    },
    age: {
      type: Number,
      required: true
    }
  }, 
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User({
    _id: attrs.id,
    email: attrs.email,
    name: attrs.name,
    surname: attrs.surname,
    gender: attrs.gender,
    age: attrs.age
  });
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };