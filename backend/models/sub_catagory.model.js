import mongoose from "mongoose";

const subCatagorySchema = new mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    catagory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Catagory"
        }
    ]
})

const SubCatagory = mongoose.model("SubCatagory", subCatagorySchema);

export default SubCatagory