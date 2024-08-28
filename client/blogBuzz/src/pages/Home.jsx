import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios';
import conf from '../conf'
import Image from '../components/Image.jsx';

const Home = () => {
  const [posts,setPosts] =useState([]);
  const cat= useLocation().search

  useEffect(()=>{
    const fetchData =async()=>{
      try{
        const res=await axios.get(conf.apiUrl+`/posts${cat}`)
        setPosts(res.data);
      }catch(err){
        console.log(err);
      }
    };
    fetchData();
  },[cat])

  const getText=(html)=>{
    const doc=new DOMParser().parseFromString(html,'text/html')
    return doc.body.textContent
  }
  
  return (
   (posts.length!=0)? <div className='home'>
      <div className="posts">
        {posts.map(post=>(
          <div className="post" key={post.id}>
            <Image url={post.img}></Image>
            <div className="content">
              <Link  className="link" to={`/post/${post.id}`}>
                <h1>{post.title.substring(0,100)}</h1>
              </Link>
              <p>{getText(post.desc).substring(0,200)}.....</p>
              <Link  className="link" to={`/post/${post.id}`}>
                <button>Read more</button>
              </Link>
                
            </div>
          </div>
        ))}
      </div>
    </div>:
    <div className='home'>
        <div className='loading'>
          <img src='https://i.giphy.com/feN0YJbVs0fwA.webp'></img>
          <h1>Loading...</h1>
      </div>
    </div>
    
  )
}

export default Home
