import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    address: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    },
    country: {
        type: String,
        default: ""
    },
    mobile: {
        type: Number,
        default: null
    },
    pincode: {
        type: Number,
        default: null
    },
    status: {
        type: Boolean,
        default: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

const Address = mongoose.model("Address", addressSchema);

export default Address