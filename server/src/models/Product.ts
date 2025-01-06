import mongoose, { Schema, Document } from 'mongoose';

interface IProduct extends Document {
  title: string;
  imagePath: string;
}

const productSchema: Schema<IProduct> = new Schema({
  title: { type: String, required: true },
  imagePath: { type: String, required: true },
});

const Product = mongoose.model<IProduct>('Product', productSchema);
export default Product;