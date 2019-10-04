import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosWithAuth } from "./axiosWithAuth";
import './App.css'
const Posts = () => {
const initialPost = {
    name:'',
    description: '',
  };
const findPost = {
  id: ''
}
  const initialComment = {
    project_id: ' ',
    notes: '',
    description: '',
  };
      const 
     const [comments, updateComments ] = useState([]);
  const [posts, updatePosts ] = useState([]);
      // useEffect(() => {
      //   getData();
      // }, []);
      // const getData = () => {
      // axiosWithAuth()
      //     .get('/')
      //     .then(res => updatePosts(res.data))
      //     .catch(error => console.log(error));
          
      // }
    const getPost = () => {
      axiosWithAuth()
          .get(`/${PostToFind.id}/posts`, PostToFind.id)
          .then(res => 
           updatePosts(res.data))
        
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
    const [PostToFind, setPostToFind] = useState(findPost);
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
             <legend>Find Project</legend>
         
         <label>
         <select type = "number" name="sleepquality"   onChange={e =>
                setPostToFind({ ...PostToFind, id: e.target.value })} >
             <option value="1" >1</option>
              <option value="2">2</option>
              <option value="3">3</option>
             <option value="4">4</option>
             </select>
         
         </label>
 {!editing && (
    <form onSubmit={createPost}>

     
          <legend>New Project</legend>
         
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
          <label>
            Description:
            <input type="text"
              onChange={e =>
                setPostToEdit({
                  ...PostToEdit,
                  description: e.target.value})
              }
              value={PostToEdit.description}
            />
          </label>
         
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
                <p>{comment.description}</p>
              </div>
           
            ))}
            </div>
            )}
            <legend> Edit The Project </legend>
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
          <label>
            Description:
            <input type="text"
              onChange={e =>
                setPostToEdit({
                  ...PostToEdit,
                  description: e.target.value})
              }
              value={PostToEdit.description}
            />
          </label>
         
        
         
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
        )}
          
    <form onSubmit={createComment}>
     
          <legend> Create An Action </legend>
         
          <label>
          description:
            <input type="text"
              onChange={e =>
                setCommentToEdit({
                  ...CommentToEdit,
                  project_id: PostToEdit.id,
                description: e.target.value})
              }
              value={CommentToEdit.description}
            />
          </label>
          <label>
            Notes:
            <input type="text"
              onChange={e =>
                setCommentToEdit({
                  ...CommentToEdit,
                  project_id: PostToEdit.id,
                notes: e.target.value})
              }
              value={CommentToEdit.notes}
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