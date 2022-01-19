import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    user_name: { type: String},
    gender:{type:String},
    city:{type:String},
    interestIn:{type:String},
    role: { type: String, default: 'user' },
}, { timestamps: true });

export default mongoose.model('User', userSchema, 'users');