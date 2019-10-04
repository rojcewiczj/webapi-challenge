import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosWithAuth } from "./axiosWithAuth";
import './App.css'

const Posts = () => {
  const [posts, updatePosts ] = useState([]);
      useEffect(() => {
        getData();
      }, []);
      const getData = () => {
      axiosWithAuth()
          .get('/')
          .then(res => updatePosts(res.data))
          .catch(error => console.log(error));
          
      }
    return (
      <div>
    {posts.name}
    
        
    
      </div>
    )
    }
    export default Posts;