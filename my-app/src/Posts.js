import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosWithAuth } from "./axiosWithAuth";
import './App.css'

const Projects= () => {
   const initialProject = {
          id: '1',
          name: ' ',
          description:''
   }
   const viewNewProject =  {
     id:" ",
   }
   const initialProject2 = {
    
    name: ' ',
    description:' '
}
   const initialAction = {
    
    note: ' ',
    description:''
}
const [ProjectToEdit, setProjectToEdit] = useState(initialProject);
 const [ProjectToEdit2, setProjectToEdit2] = useState(initialProject2);
 const [ProjectToEdit3, setProjectToEdit3] = useState(initialProject);
  const [projects, updateProjects ] = useState([]);
   const [newProject, updateNewProject] = useState([]);
      // useEffect(() => {
      //   getData();
      // }, []);
      // const getData = () => {
      //    const ProjectID = Number(initialProject.id);
      //     console.log(initialProject)
      // axiosWithAuth()
      //     .get(`/${ProjectID}`)
      //     .then(res => updateProjects(res.data))
      //     .catch(error => console.log(error));
          
      // }
    console.log(ProjectToEdit3);
      const getNewProject = (e) => {
        e.preventDefault();
        console.log(ProjectToEdit3)
    axiosWithAuth()
        .get(`/${ProjectToEdit3.id}`, ProjectToEdit3.id )
        .then(res => updateNewProject(res.data))
        .catch(error => console.log(error));
      }

     const [actions, updateActions] = useState([])
      const getActions = () => {
        const ProjectID = Number(ProjectToEdit3.id);
        axiosWithAuth()
        .get(`/${ProjectID}/actions`)
        .then(res => 
         updateActions(res.data))
      
        .catch(error => console.log(error));
      }
      const createProject = e => {
        e.preventDefault();
     console.log(ProjectToEdit2);
      axiosWithAuth()
       .post(`/`, ProjectToEdit2 )
       .then(res => {
         console.log(res);
        //  getData();
       })
       .catch(err => console.log(err.response));
   }

    return (
      <div>
         <form onSubmit={createProject}>
     
     <legend>New Project</legend>
    
     <label>
       Name:
       <input type="text"
         onChange={e =>
           setProjectToEdit2({
             ...ProjectToEdit2,
           name: e.target.value})
         }
         value={ProjectToEdit2.name}
       />
     </label>
     <label>
       Description:
       <input type="text"
         onChange={e =>
           setProjectToEdit2({
             ...ProjectToEdit2,
             description: e.target.value})
         }
         value={ProjectToEdit2.description}
       />
     </label>
     <button type="submit">save</button>
     </form>
      <form onSubmit={getNewProject}>
     <label>
              View New Project:
             
              <input type="text"
         onChange={e =>
           setProjectToEdit3({
             ...ProjectToEdit3,
             id: e.target.value})
         }
         value={ProjectToEdit3.id}
       />
         
            </label>
            <button type="submit">search</button>
            </form>
            
     <br></br>
        <div>
    {newProject.name}
    </div>
      <div>
    <button className="Comments-show" onClick={() => getActions()} > Actions</button>
           
            {actions.map(action => (
              <div>
                <p>{action.description}</p>
              </div>
           
            ))}
       </div>     
      
  

    
      </div>
    )
    }
    export default Projects;