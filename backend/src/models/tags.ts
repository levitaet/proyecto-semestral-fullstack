import mongoose from 'mongoose'

export interface Tags {
  name: string;
}


export interface MongooseTags extends Tags { 
  id?: string; 
  _id?: mongoose.Types.ObjectId; 
  __v?: number;
}

const TagsSchema = new mongoose.Schema<Tags>({
  name: { type: String, required: true }
}, { 
  timestamps: true 
}); 

TagsSchema.set("toJSON", {
  transform: (
    _,
    returnedObject: MongooseTags
  ) => {
    returnedObject.id = returnedObject._id?.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const TagsModel = mongoose.model<Tags>("Tags", TagsSchema);


export default TagsModel;