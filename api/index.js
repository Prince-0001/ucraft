import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from './routes/auth.js';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import multer from "multer";

const app = express();

const allowedOrigins = ['http://localhost:5173', 'http://localhost:8800','https://ucraft.vercel.app'];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(cookieParser({ credentials: true }));
app.use(express.json());

const storage =multer.diskStorage({
destination: function(req,file,cb){
  cb(null,'../client/blogBuzz/uploads')
},
filename: function(req,file,cb){
  cb(null,Date.now()+file.originalname)
}
})

const upload =multer({storage})

app.post('/api/upload',upload.single('file'),function(req,res){
  const filename=req.file.filename||"";
  return res.status(200).json(filename)
})


app.get("/", (req, res) => {
  res.send("It works!!");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(8800, () => {
  console.log("Connected!");
});