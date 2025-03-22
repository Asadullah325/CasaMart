import mongoose from "mongoose";

const catagorySchema = new mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
}, { timestamps: true });

const Catagory = mongoose.model("Catagory", catagorySchema);

export default Catagory