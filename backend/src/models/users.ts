import mongoose from 'mongoose'


export interface User {
  id: string
  username: string
  email: string
  password: string
  // createdAt: Date
  // updatedAt: Date
}


export interface MongooseUser { 
  id?: string; 
  _id?: mongoose.Types.ObjectId; 
  __v?: number;
  username: string
  email: string
  password: string
  // createdAt: Date
  // updatedAt: Date
}

const userSchema = new mongoose.Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  // createdAt: { type: Date, default: Date.now },
  // updatedAt: { type: Date, default: Date.now },
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