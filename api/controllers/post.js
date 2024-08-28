
import { db } from "../db.js";
import jwt from 'jsonwebtoken';

export const getPosts=(req,res)=>{
    const q=req.query.cat ? 
    "select * from posts where cat=?":
    "select * from posts";

    db.query(q,[req.query.cat],(err,data)=>{
        if(err){
            console.log("query"+ q);
            console.log(req.query.cat+" cat");
            return res.status(500).send({ message: 'Internal Server Error' });
        } 

        return res.status(200).json(data);
    })
}


export const getPost=(req,res)=>{
    const q="select cat,username, p.img,u.img as userImage,`title`, `desc`, `cat`, `date` from users u inner join posts p on u.id=p.uid where p.id=? "

    db.query(q,[req.params.id],(err,data)=>{
        if(err) return res.json(err);

        return res.status(200).json(data[0]);
    })
}
export const addPost=(req,res)=>{
    const token=req.cookies.access_token
    if(!token) return res.status(401).json("Not authenticated!")

        jwt.verify(token,"&*()",(err,userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")
            const q='insert into posts (`title`,`desc`,`img`,`cat`,`date`,`uid`) values (?)';
            const values=[
                req.body.title,
                req.body.desc,
                req.body.img,
                req.body.cat,
                req.body.date,
                userInfo.id
            ]
            db.query(q,[values],(err,data)=>{
                if(err) return res.status(500).send(err);
                return res.json("Post has been created.");
            })
        })
}
export const deletePost=(req,res)=>{
    const token=req.cookies.access_token
    // console.log(token);
    if(!token) return res.status(401).json("Not authenticated!")

        jwt.verify(token,"&*()",(err,userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")
            const postId=req.params.id  

            const q  ="Delete from posts where  `id`=? and `uid`=?"
        
            db.query(q,[postId,userInfo.id],(err,data)=>{
                if(err) res.status(403).send("You can delete only your post!!")

                res.status(200).send("Post deleted succefully!!");
            })
        })
}
export const updatePost=(req,res)=>{
    const token=req.cookies.access_token
    if(!token) return res.status(401).json("Not authenticated!")

        jwt.verify(token,"&*()",(err,userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")
            const q='update posts set `title`=? ,`desc`=?, `img`=?, `cat`=? where `id`=? and `uid`=?';
            const values=[
                req.body.title,
                req.body.desc,
                req.body.img,
                req.body.cat,
                parseInt(req.params.id),
                userInfo.id,
            ]
            db.query(q,[...values],(err,data)=>{
                if(err){
                    console.log(err)
                    res.status(500).send(err);
                } 
                return res.json("Post has been updated.");
            })
        })
}