import mongoose from 'mongoose'

export interface User {
  username: string;
  email: string;
  passwordHash: string;
  posts: mongoose.Types.ObjectId[];
}

export interface MongooseUser extends User { 
  id?: string; 
  _id?: mongoose.Types.ObjectId; 
  __v?: number;
}

const userSchema = new mongoose.Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
}, { 
  timestamps: true 
}); 

userSchema.set("toJSON", {
  transform: (
    _,
    returnedObject: MongooseUser
  ) => {
    returnedObject.id = returnedObject._id?.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;