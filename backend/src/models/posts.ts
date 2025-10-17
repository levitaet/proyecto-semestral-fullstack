import mongoose from 'mongoose'


interface Post {
  title: string;
  price: string;
  product_id: string;
  author_id: string;
  createdAt: Date;
  updatedAt: Date;
  tag: string;
  location: string;
  availability: boolean;
  stock: number | null;
  image: string;
}


export interface MongoosePost extends Post { 
  id?: string; 
  _id?: mongoose.Types.ObjectId; 
  __v?: number;
}

const postSchema = new mongoose.Schema<Post>({
  title: { type: String, required: true },
  price: { type: String, required: true },
  product_id: { type: String, required: true },
  author_id: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  tag: { type: String },
  location: { type: String, required: true },
  availability: { type: Boolean, default: true },
  stock: { type: Number, default: null },
  image: { type: String, default: "no-image.png" },
}, { 
  timestamps: true 
}); 

const PostModel = mongoose.model<Post>("Post", postSchema);

postSchema.set("toJSON", {
  transform: (
    _,
    returnedObject: MongoosePost
  ) => {
    returnedObject.id = returnedObject._id?.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default PostModel;