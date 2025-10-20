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
  username: { 
    type: String, 
    required: true,
    unique: true,
    minlength: 3
  },
  email: { 
    type: String, 
    required: true,
    unique: true
  },
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
        _document,
        returnedObject: {
            id?: string;
            _id?: mongoose.Types.ObjectId;
            __v?: number;
            passwordHash?: string;
        }
  ) => {
    returnedObject.id = returnedObject._id?.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});


export default UserModel;