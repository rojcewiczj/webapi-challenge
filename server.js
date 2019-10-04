const express = require('express');
const cors = require('cors')
const projectRouter = require('./data/helpers/projectRouter');
const server = express();
server.use(express.json());
server.use(cors());
server.use(logger)
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});
server.use('/api/users', projectRouter);
//custom middleware

  function logger(req, res, next) {
    console.log(
      `[${new Date().toISOString()}] ${req.method} to ${req.url} `
    );
  
    next();
  };
  server.listen(4000, () => {
    console.log('\n*** Server Running on http://localhost:4000 ***\n');
  });
  

module.exports = server;
