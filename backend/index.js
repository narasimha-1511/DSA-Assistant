const express = require('express'); 
const path = require('path');

const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'public', 'index.html');
  res.sendFile(indexPath);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})