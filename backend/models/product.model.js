import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide product name"],
    },
    image: {
        type: Array,
        default: []
    },
    catagory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Catagory"
        }
    ],
    sub_catagory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubCatagory"
        }
    ],
    unit: {
        type: String,
        default: ""
    },
    stpck: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: ""
    },
    more_details: {
        type: Object,
        default: {}
    },
    published: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Product = mongoose.model("Product", productSchema);

export default Product