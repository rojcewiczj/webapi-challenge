const express = require('express');
const Projects = require('./projectModel')
const Actions = require('./actionModel')
const Mappers = require('./mappers')
const router = express.Router()
router.use((req, res, next) => {
    console.log('Your Router!');
    next();
  });


router.post('/', [validateProject], (req, res) => {
    const newProject = req.body
    Projects.insert(newProject)
    .then(project => {
        res.status(201).json(project);
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
          error: 'There was an error while saving the user to the database',
        });
      });
});

router.post('/:id/actions', [ validateProjectId , validateAction ], (req, res) => {
    const Action = { ...req.body, project_id: req.params.id };

    Actions.insert(Action)
    .then(action => {
      res.status(210).json(action);
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error getting the action for the project',
      });
    });
});

router.get('/', (req, res) => {
    Projects.get(req.query)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'The projects could not be retrieved.',
      });
    });
    
});

router.get('/:id', [ validateProjectId ], (req, res) => {
    const id = req.params.id;
    Projects.get(id)
       .then(user => {
           res.status(200).json(user);
       })
       .catch(error => {
         // log error to database
         console.log(error);
         res.status(500).json({
           error: '"This projects information could not be retrieved."',
         });
       });
});

router.get('/:id/actions', [ validateProjectId],(req, res) => {
    Projects.getProjectActions(req.params.id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error getting the actions of this project',
      });
    });
});

router.delete('/:id', [ validateProjectId ], (req, res) => {
    Projects.remove(req.params.id)
    .then(count => {
      if (count) {
        res.status(200).json({ message: 'This project has been removed' });
      } else {
        res.status(404).json({ message: 'The project could not be found' });
      }
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error removing this user',
      });
    });
});

router.put('/:id', [ validateProjectId, validateProject ], (req, res) => {
    Projects.update(req.params.id, req.body)
    .then(count => {
        if (count) {
          res.status(200).json({ message: 'This user has been updated' });
        } else {
          res.status(404).json({ message: 'This user was not found' });
        }
      })
      .catch(error => {
        // log error to server
        console.log(error);
        res.status(500).json({
          message: 'Error updating the user',
        });
      });
});

//custom middleware

function validateProjectId(req, res, next) {
    const { id } = req.params;
    Projects.get(id)
    .then(project => {
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(400).json({ message: "Invalid project ID"});
        
        // error handling middleware option:
        // next({ message: "Invalid id; hub not found"});
      }
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error processing request',
      });
    });
};





function validateProject(req, res, next) {
    const Project = req.body;
    if (Project && Object.keys(Project).length > 0) {
        next();
      } else if (!Project.name || !Project.description ){
        res.status(400).json({ message: 'missing required name or description field' });
      }
      else {
        res.status(400).json({ message: "missing Project data" });
      
        // error handling middleware option:
        // next({ message: "Please include request body" }));
      }
    };
      

function validateAction(req, res, next) {
    const Action = req.body;
    if (Action && Object.keys(Action).length > 0) {
        next();
      } else if (!Action.description || !Action.notes ){
        res.status(400).json({ message: 'missing required description or notes field' });
      }
      else {
        res.status(400).json({ message: "missing action data" });
      
        // error handling middleware option:
        // next({ message: "Please include request body" }));
      }
    
};

module.exports = router;