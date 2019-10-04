import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosWithAuth } from "./axiosWithAuth";
import './App.css'
const Posts = () => {
const initialPost = {
    name:''
  };

  const initialComment = {
    user_id:'',
    text: '',
  };
     const [comments, updateComments ] = useState([]);
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
    
    
    
     const getComments= () => {

      axiosWithAuth()
          .get(`/${PostToEdit.id}/posts`, PostToEdit.id)
          .then(res => 
           updateComments(res.data))
        
          .catch(error => console.log(error));
      
        
  } 


   console.log(comments)
    console.log(posts);
    const [editing, setEditing] = useState(false);
    const [showing, setShowing] = useState(true);
    const [postShowing, setPostShowing] = useState(true);
    const [PostToEdit, setPostToEdit] = useState(initialPost);
    const [CommentToEdit, setCommentToEdit] = useState(initialComment); console.log(CommentToEdit)
  console.log("Post to edit", PostToEdit)
  console.log("initial Post", initialPost)
    const editPost = post=> {
      setEditing(true);
      setPostToEdit(post);
    }
   
    const saveEdit = e => {
        e.preventDefault();
         axiosWithAuth()
          .put(`/${PostToEdit.id}`, PostToEdit)
          .then(res => {
            console.log(res.data)
              getData();
          })
          .catch(err => console.log(err.response));
            
      };
      
      const createPost = e => {
        e.preventDefault();
     console.log(PostToEdit);
      axiosWithAuth()
       .post(`/`, PostToEdit )
       .then(res => {
         console.log(res);
         getData();
       })
       .catch(err => console.log(err.response));
   }
   const createComment = e => {
    e.preventDefault();
    console.log(CommentToEdit);
  axiosWithAuth()
   .post(`/${PostToEdit.id}/posts`, CommentToEdit )
   .then(res => {
     console.log(res);
     getData();
   })
   .catch(err => console.log(err.response));
}

   const deletePost = post => {
    console.log(post);
     axiosWithAuth()
      .delete(`/${post.id}`, post.id)
      .then(res => {
        console.log(res);
        getData();
      })
      .catch(err => console.log(err.response));
  };
      return (
         <div className="main-container">
             <div className="Post-container">
 {!editing && (
    <form onSubmit={createPost}>
     
          <legend>New User</legend>
         
          <label>
            Name:
            <input type="text"
              onChange={e =>
                setPostToEdit({
                  ...PostToEdit,
                name: e.target.value})
              }
              value={PostToEdit.name}
            />
          </label>
          {/* <label>
            Content:
            <input type="text"
              onChange={e =>
                setPostToEdit({
                  ...PostToEdit,
                  contents: e.target.value})
              }
              value={PostToEdit.contents}
            />
          </label> */}
         
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)} onClick={() => setPostShowing(true)}>cancel</button>
          </div>
        </form>
        )}
        {editing && (
    <form onSubmit={saveEdit}>
     
         
         {postShowing && (
          <div >
   <button className="Comments-show" onClick={() => getComments()} > posts</button>
            {console.log("user posts >", comments)}
            {comments.map(comment => (
              <div>
                <p>{comment.text}</p>
              </div>
           
            ))}
            </div>
            )}
            <legend> Edit The User </legend>
          <label>
            Name:
            <input type="text"
              onChange={e =>
                setPostToEdit({
                  ...PostToEdit,
                name: e.target.value})
              }
              value={PostToEdit.name}
            />
          </label>
          {/* <label>
            Content:
            <input type="text"
              onChange={e =>
                setPostToEdit({
                  ...PostToEdit,
                  contents: e.target.value})
              }
              value={PostToEdit.contents}
            />
          </label> */}
         
        
         
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
        )}
          
    <form onSubmit={createComment}>
     
          <legend> Create A Post </legend>
         
          <label>
            Post:
            <input type="text"
              onChange={e =>
                setCommentToEdit({
                  ...CommentToEdit,
                  user_id: PostToEdit.id,
                text: e.target.value})
              }
              value={CommentToEdit.text}
            />
          </label>
        
        
        
         
          <div className="button-row">
            <button type="submit">save</button>
           
          </div>
        </form>
        

       </div> 
          <div className="list">
      <ul> 
       <button onClick={() => setShowing(false)}> hide </button>
       <button onClick={() => setShowing(true)}> show </button>
         {showing && (
          
         <form>  
       {posts.map(post => (
         
         <li id="sessionDate" key={post.id} onClick={() => editPost(post)}>
         <span>
           <span className="delete" onClick={() => deletePost(post)}>
             
           {post.id} 
           </span>{" "} 
          {post.name}
           {/* {post.contents} */}
         </span>
           
         
       </li>
       
        ))}
        
        </form>
         )}
 </ul> 
 </div>
 </div>
      )
    
    
    }
    export default Posts;