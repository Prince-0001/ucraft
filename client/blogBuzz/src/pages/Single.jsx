import React, { useState,useEffect, useContext } from 'react'
import { Link,  useLocation,useNavigate } from 'react-router-dom'
import Menu from './Menu'
import axios from 'axios'
import conf from '../conf'
import moment from 'moment'
import { AuthContext } from '../context/AuthContext'
import DomPurify from 'dompurify'

const Single = () => {
  
  const [post,setPost] =useState({});

  const location= useLocation()

  const navigate= useNavigate()

  const postId=location.pathname.split("/")[2];

  const {currentUser}=useContext(AuthContext);



  useEffect(()=>{
    const fetchData =async()=>{
      try{
        const res=await axios.get(conf.apiUrl+`/posts/${postId}`)
        setPost(res.data);
      }catch(err){
        console.log(err);
      }
    };
    fetchData();
  },[postId])

  const handleDelete= async()=>{
    try{
      await axios.delete(conf.apiUrl+`/posts/${postId}`,{
        withCredentials:true,
      });
      navigate("/");
    }catch(err){
      console.log(err);
    }
  }
  const getText=(html)=>{
    const doc=new DOMParser().parseFromString(html,'text/html')
    return doc.body.textContent
  }
  return (
    <div className='single'>
      <div className="content">
        <img src={`../uploads/${post?.img}`}></img>
        <div className='user'>
          <img src={post.userImage?post.userImage:`http://cdn-icons-png.flaticon.com/128/1144/1144760.png`}></img>
          <div className='info'>
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()} </p>
          </div>
          {/* {currentUser?.username===post.username && */}
          <div className="edit">
            <Link to={`/write?edit=${postId}`} state={post}>
            <img src={"https://cdn-icons-png.flaticon.com/128/10336/10336582.png"} alt="" />
            </Link>
            
            <img  onClick={handleDelete} src="https://cdn-icons-png.flaticon.com/128/9068/9068885.png" alt="" />
          </div>
          {/* } */}
        </div>
        <h1>{getText(post.title)}</h1>
        <p
        dangerouslySetInnerHTML={{
          __html:DomPurify.sanitize(post.desc),
        }}
        ></p>
      </div>
      <Menu cat={post.cat}/>
      
    </div>
  )
}

export default Single
