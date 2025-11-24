import mongoose from 'mongoose'

interface Post {
  title: string;
  product_name: string;
  description: string;
  price: number;
  author_name: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  category: string;
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

const CATEGORIES = ['Comida', 'Joyas', 'Servicios', 'Electrónica', 
  'Artesanias', 'Otros'];

const postSchema = new mongoose.Schema<Post>({
  title: { type: String, required: true },
  product_name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  author_name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  tags: { type: [String], default: [] },
  category: { 
    type: String, 
    required: true,
    enum: CATEGORIES,
    default: 'Otros'
  },
  location: { type: String, required: true },
  availability: { type: Boolean, default: true },
  stock: { type: Number, default: null },
  image: { type: String, default: "" },
}, { 
  timestamps: true 
}); 

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

const PostModel = mongoose.model<Post>("Post", postSchema, "fcfmarket_posts");

export { CATEGORIES };
export default PostModel;