import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from './routes/auth.js';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import multer from "multer";
import path from "path";


const app = express();



// const allowedOrigins = ['http://localhost:5173', 'http://localhost:8800','https://ucraft.vercel.app'];
const allowedOrigins = ['https://ucraft.onrender.com','https://ucraft.vercel.app'];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(cookieParser({ credentials: true }));
app.use(express.json());
app.use('/api/images',express.static('public/images/'))



const storage =multer.diskStorage({
destination: function(req,file,cb){
  cb(null,'public/images')
},
filename: function(req,file,cb){
  cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))
}
})

const upload =multer({storage})

app.post('/api/upload',upload.single('file'),function(req,res){
  return res.status(200).json(req.file.filename?req.file.filename:"No Image");
  
  
})



app.get("/", (req, res) => {
  res.send("It works!!");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(4000, () => {
  console.log("Connected!");
});