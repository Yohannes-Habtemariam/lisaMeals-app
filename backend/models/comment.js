import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema( {

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, required: true },
    message: { type: String, required: true }
    
}, { timestamps: true } );

const Comment = mongoose.model( "comments", commentSchema );

export default Comment;
