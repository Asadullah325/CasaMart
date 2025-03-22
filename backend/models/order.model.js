import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    orderId: {
        type: String,
        required: [true, "Please provide order id"],
        unique: true
    },
    product_details: {
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        name: String,
        image: Array,
    },
    paymentId: {
        type: String,
        default: ""
    },
    payment_status: {
        type: String,
        default: ""
    },
    delivery_address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address"
    },
    delivery_status: {
        type: String,
        default: "Pending"
    },
    subTotalAmt: {
        type: Number,
        default: 0
    },
    totalAmount: {
        type: Number,
        default: 0
    },
    invoice: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
})

const Order = mongoose.model("Order", orderSchema);

export default Order