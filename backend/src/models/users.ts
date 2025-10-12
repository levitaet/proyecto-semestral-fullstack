import mongoose from 'mongoose'


export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  posts: mongoose.Types.ObjectId[];
}


export interface MongooseUser { 
  id?: string; 
  _id?: mongoose.Types.ObjectId; 
  __v?: number;
  username: string;
  email: string;
  passwordHash: string;
  posts: mongoose.Types.ObjectId[];
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

const UserModel = mongoose.model<User>("User", userSchema);

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

export default UserModel;