import mongoose from "mongoose";
const BookSchema=mongoose.Schema({
    title:String,
    Booked:Boolean,
    BookNumber:{type:Number,unique : true },
    path:String,
    isReturned:Boolean,
    TakenDate: { type: Date, default: Date.now() },
    ReturnDate: { type: Date, default: Date.now() },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    }
    },{timestamps:true})
export const BookModel = mongoose.model('Book',BookSchema)
