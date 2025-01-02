import mongoose from 'mongoose';

const now = new Date()

const NotificationSchema = new mongoose.Schema({
    addresser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    type: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: false,
        default: `${now.toLocaleTimeString()}, ${now.toLocaleDateString()}` 
    },
    orderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: false
    }
}, {
    timeseries: true,
});

export default mongoose.model('Notification', NotificationSchema);