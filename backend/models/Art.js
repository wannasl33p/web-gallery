import mongoose from 'mongoose';

const ArtSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    authorName: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: false,
        default: '',
    },
    artStyle: {
        type: String,
        required: true,
    },
    artSubject: {
        type: String,
        required: true,
    },

    L: {
        type: Number,
        required: true,
    },
    B: {
        type: Number,
        required: true,
    },
    H: {
        type: Number,
        required: false,
        default: null,
    },
    imagesURL: {
        type: Array,
        required: true,
    },
    catalogStatus: {
        type: String,
        required: false,
        default: "moderation",
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    }

}, {
    timeseries: true,
});

export default mongoose.model('Art', ArtSchema);