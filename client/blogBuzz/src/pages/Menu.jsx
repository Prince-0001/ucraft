import React ,{useEffect,useState}from 'react'
import axios from 'axios';
import conf from '../conf';
import Image from '../components/Image';
import { Link } from 'react-router-dom';

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
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);
  return (
    <div className='menu'>
      <h1> Other posts you may like</h1>
      {posts.map((post)=>(
        <div className="post" key={post.id}>
            <Link  className="link" to={`/post/${post.id}`}>
             <Image url={post.img}></Image>
            <h2>{post.title}</h2>
            <button> Read More</button>
            </Link>
            
        </div>
      ))}
    </div>
  )
}

export default Menu
