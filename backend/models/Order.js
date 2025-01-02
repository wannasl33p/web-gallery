import mongoose from "mongoose";

const date = new Date();

const OrderSchema = new mongoose.Schema(
  {
    artId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Art",
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    orderStatus: {
      type: String,
      required: false,
      default: "moderation1",
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderDate: {
      type: String,
      required: false,
      default: `${date.toLocaleTimeString()}, ${date.toLocaleDateString()}`,
    },
    orderConfirmDate: {
      type: Object,
      required: false,
      default: null,
    },
    cost: {
      type: Number,
      required: true,
    },
    customerName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  {
    timeseries: true,
  }
);

export default mongoose.model("Order", OrderSchema);
