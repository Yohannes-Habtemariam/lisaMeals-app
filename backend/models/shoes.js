import mongoose from "mongoose";

const { Schema } = mongoose;

const shoeSchema = new Schema({
    shoeName: {type: String, required: true}, 
    img: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true, min: 3},
    rating: {type: Number, required: true, min: 0},
}, {timestamps: true});

const Shoe = mongoose.model("shoes", shoeSchema);

export default Shoe;