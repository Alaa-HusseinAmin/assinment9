import moment from 'moment';
import { BookModel } from "../../../database/models/Book.model.js";
import { catchAsyncErr } from "../../utils/catchErr.js";

export const addBook= catchAsyncErr(async(req,res)=>{
    const {title,Booked,BookNumber,isReturned,TakenDate,ReturnDate} =req.body;
    console.log(req.file);
    console.log(title)
    await BookModel.insertMany({path:req.file.filename,title,Booked,BookNumber,isReturned,TakenDate,ReturnDate})
     res.json({message:"success"})
    }
) 

export const findBook= catchAsyncErr(async(req,res)=>{
     let book=await BookModel.find()
     res.json({message:"success",book})
    }
) 

export const findTakenBooks= catchAsyncErr(async(req,res)=>{
    const {title,Booked,BookNumber,isReturned,TakenDate,ReturnDate} =req.body;
    let book=await BookModel.find({path:req.file.filename,title,Booked,BookNumber,isReturned,TakenDate,ReturnDate}).populate('createdBy')
    res.json({message:"success",book})
   }
) 

export const findNotTakenBooks= catchAsyncErr(async(req,res)=>{
    const {title,Booked,BookNumber,isReturned,late,fine,TakenDate,ReturnDate} =req.body;
    if(late){
        startdate = moment();
        startdate.subtract(1, 'd');
        startdate.format('DD-MM-YYYY');
        "8-03-2023"
        // startdate = moment();
        // startdate.subtract(1, 'd');
        // myString = startdate.format('DD-MM-YYYY');
        // "8-03-2023"
        // myString
        // "8-03-2023"
        const fineofBooks= 50* moment('d')
        let book=await BookModel.find({path:req.file.filename,title,Booked,BookNumber,isReturned,late,fine,TakenDate,ReturnDate}).populate('createdBy')
        res.json({message:"success",book,fineofBooks})
    }else{
        return next(new AppErr('Account not found"',404))
    }
   }
) 



