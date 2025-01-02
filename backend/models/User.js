import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        useCreateIndex: true, 
        autoIndex: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },

}, {
    timeseries: true,
});

export default mongoose.model('User', UserSchema);