import express from "express";
import { fileUpload } from "../../utils/fileUpload.js";
import { addBook, findBook, findNotTakenBooks, findTakenBooks } from "./Book.controller.js";
const BookRouter = express.Router()

BookRouter.post('/',fileUpload('path'),addBook)
BookRouter.get('/',findBook)
BookRouter.get('/findTakenBooks',findTakenBooks)
BookRouter.get('/findNotTakenBooks',findNotTakenBooks)





export default BookRouter;
