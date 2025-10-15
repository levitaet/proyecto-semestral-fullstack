import mongoose from 'mongoose'

export interface Product {
  product_name: string;
  description: string;
  price: string;
  id_author: string;
  images: string[];
}


export interface MongooseProduct extends Product { 
  id?: string; 
  _id?: mongoose.Types.ObjectId; 
  __v?: number;
}

const productSchema = new mongoose.Schema<Product>({
  product_name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  id_author: { type: String, required: true },
  images: { type: [String], default: [] },
}, { 
  timestamps: true 
}); 

productSchema.set("toJSON", {
  transform: (
    _,
    returnedObject: MongooseProduct
  ) => {
    returnedObject.id = returnedObject._id?.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const ProductModel = mongoose.model<Product>("Product", productSchema);


export default ProductModel;