process.on('uncaughtException',()=>{
console.log('err');
})
import express from "express";
import { dbConnection } from "./database/db.connection.js";
import { globalErrorMiddleware } from "./src/middelware/globalErr.js";
import BookRouter from "./src/modules/Books/Book.router.js";
import userRouter from "./src/modules/user/user.router.js";
import { AppErr } from "./src/utils/AppErr.js";

const app = express();
const port = 3000;


app.use(express.static('uploads'))
app.use(express.json());


app.use("/users",userRouter);
app.use("/books",BookRouter);


app.get("/", (req, res) => res.send("Hello World!"));
app.use((err, req, res, next) => {
  res.json({ err });
});


app.all('*',(req,res,next)=>{
  next(new AppErr('not found endpoint',404))
})
  
app.use(globalErrorMiddleware)

dbConnection();
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
process.on('unhandledRejection',(err)=>{
  console.log("err");
})