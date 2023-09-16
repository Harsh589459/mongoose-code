const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const User = require('./models/user')

const errorController = require('./controllers/error');
// const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('650569f88fe761a11f98abbe')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect('mongodb+srv://harsh589459:b0u832Sa0UDOfpeZ@cluster0.r9y8m8c.mongodb.net/shop?retryWrites=true&w=majority'
  )
  .then(result => {
    User.findOne().then(user=>{
      if(!user){

        const user = new User({
          name:'Harsh',
          email:'hs589459@gmail.com',
          cart:{
            items:[]
          }
    
          
        })
        user.save();
      }
      app.listen(3000);

    })
  })
  .catch(err => {
    console.log(err);
  });
