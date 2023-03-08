import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../../../database/models/user.schema.js";
import { sendMail } from "../../email/user.emails.js";
import { catchAsyncErr } from "../../utils/catchErr.js";


export const signUp = catchAsyncErr(async (req, res) => {
  const { name, email, password, age, PhoneNumber } = req.body;
  let user = await userModel.findOne({ email });
  if (user) {
   return next(new AppErr('email already in use',400))
    // res.json({ message: "email already in use" });
  } else {
    let hash = bcrypt.hashSync(password, 8);
    await userModel.insertMany({
      name,
      email,
      age,
      PhoneNumber,
      password: hash,
    });
    res.json({ message: "success" });
    sendMail({ email });
  }
});



export const signIn = catchAsyncErr(async (req, res) => {
  const { _id, email, name, password } = req.body;
  let isFound = await userModel.findOne({ email });
  if (isFound) {
    const match = await bcrypt.compare(password, isFound.password);

    if (match) {
      let token = jwt.sign(
        {
          name: isFound.name,
          userId: isFound._id,
          email: isFound.email,
          role: isFound.role,
        },
        "alaa"
      );
      res.json({ message: "login", token });
    } else {
     return next(new AppErr('password incorrect',404))
      // res.json({ message: "password incorrect" });
    }
  } else {
    return next(new AppErr('Account not found"',404))
    // res.json({ message: "Account not found" });
  }
});



export const Updateuser = catchAsyncErr(async (req, res) => {
  const { _id: id}=req.user;
  const {email, name, PhoneNumber } = req.body;
  let isFound = await userModel.findOne({ email });
  if (isFound) {
    let user = await userModel.findByIdAndUpdate(
      { _id: id },
      { name, PhoneNumber },
      { new: true }
    );
    res.json({ message: "success", user });
  } else {
    return next(new AppErr('Account not found',404))
  }
});




export const Deleteuser = catchAsyncErr(async (req, res) => {
  const { _id: id } = req.user;
  let isFound = await userModel.findOne({ _id: id });
  if (isFound) {
    await userModel.findByIdAndDelete({ _id: id });
    res.json({ message: "success" });
  } else {
  return next(new AppErr('Account not found',404))
    // res.json({ message: "Account not found" });
  }
});


export const changePassword=catchAsyncErr(async(req, res) => {
    const { _id: id } = req.user;
    let isFound = await userModel.findOne({ _id: id });
    if (isFound) {
    const salt = await bcrypt.genSalt(8);
    const password=await bcrypt.hash(req.body.password,salt);
    const userPassword=await user.findByIdAndUpdate({_id:userId},{password:password},{new:true});
      res.status(200).json({ message: "success" ,userPassword});
    } else {
    return next(new AppErr('Account not found',404))
      // res.json({ message: "Account not found" });
    }
  });


export const verify = catchAsyncErr(async (req, res) => {
  let { token } = req.params;
  jwt.verify(token, "email", async function (err, decoded) {
    if (!err) {
      await userModel.findOneAndUpdate(
        { email: decoded.email },
        { confirmedEmail: true }
      );
      res.json({ message: "verified" });
    } else {
  return next(new AppErr(err,401))
      // res.json(err);
    }
  });
});

export const userLogout=catchAsyncErr(async(req,res)=>{
  const { _id: id } = req.user;
    let isFound = await userModel.findOne({ _id: id });
    if (isFound) {
      res.clearCookie('remember_me');
      req.logout();
      res.redirect('/');
    //   req.logout
    //  req.session.destroy();
      res.status(200).json({ message: "success"});
    } else {
    return next(new AppErr('Account not found',404))
}})


// export const SoftDeleteUsers = catchAsyncErr(async (req, res) => {
//   const { _id: id } = req.body;
//   let user = await userModel.findOne({ _id: id });
//   if (user) {
//     const deleted = await userModel.softDelete({
//       _id: user._id,
//       name: user.name,
//     });
//     if (deleted) {
//       const restored = await this.userModel.restore(deleted);
//       res.json({ restored });
//     } else {
//       res.json({ message: "no deleted users" });
//     }
//   } else {
//     res.json({ message: "notfound" });
//   }
// });
    