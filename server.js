import express from 'express';
import path from 'path';

const app = express();
const port = 3000;

app.get('/', function(req, res) {
  res.sendFile('C:\Users\leose\OneDrive\Documents\programming and projects\Ants\Ants.html');
  res.sendFile('C:\Users\leose\OneDrive\Documents\programming and projects\Ants\Ants.js');
})

app.listen(port);
console.log('Express server running at http://localhost:' + port);
