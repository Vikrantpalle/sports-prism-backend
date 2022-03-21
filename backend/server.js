const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000
const { signup, signin } = require('./controllers/auth');
const { db } = require('./models/User');

mongoose
 .connect(process.env.DATABASE,{
})
 .then(() => console.log('DB Connected'));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json()); 
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/signin',signin)
app.post('/signup',signup)

const sportsRouter=require('./routes/sports');
app.use('/sports',sportsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})