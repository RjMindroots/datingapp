import { string } from 'joi';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_name: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender:{type:String},
    city:{type:String},
    interestIn:{type:String},
    role: { type: String, default: 'user' },
}, { timestamps: true });

export default mongoose.model('User', userSchema, 'users');