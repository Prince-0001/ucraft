import React ,{useEffect,useState}from 'react'
import axios from 'axios';
import conf from '../conf';

const Menu = ({cat}) => {
  const [posts,setPosts] =useState([]);

  useEffect(()=>{
    const fetchData =async()=>{
      try{
        const res=await axios.get(conf.apiUrl+`/posts?cat=${cat}`)
        setPosts(res.data);
      }catch(err){
        console.log(err);
      }
    };
    fetchData();
  },[cat])
  return (
    <div className='menu'>
      <h1> Other posts you may like</h1>
      {posts.map((post)=>(
        <div className="post" key={post.id}>
            <img src={`../uploads/${post.img}`} alt=''></img>
            <h2>{post.title}</h2>
            <button> Read More</button>
        </div>
      ))}
    </div>
  )
}

export default Menu
