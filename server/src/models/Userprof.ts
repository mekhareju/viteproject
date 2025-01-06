import mongoose, { Schema, Document } from 'mongoose';

interface IUserProf extends Document {
  name: string;
  email: string;
  password: string;
  location: string;
}

const userProfSchema: Schema<IUserProf> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String, required: true },
});

const UserProf = mongoose.model<IUserProf>('UserProf', userProfSchema);
export default UserProf;