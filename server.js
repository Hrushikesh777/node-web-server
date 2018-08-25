const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 8000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');


hbs.registerHelper('c_year', () => {
  return new Date().getFullYear()
});

app.use((req,res,next) => {
  var now = new Date().toString();
  let log = `${now} : ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err)
    {
      console.log('unable to write file server.log');
    }
  });
  next();
});

// app.use((req,res,next) => {
//   res.render('maintainance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req,res) => {
  // res.send('Hey There!!!');
  // res.send({
  //   name: 'hrushikesh',
  //   likes: ['playing games', 'coding', 'movies']
  // });
  res.render('home.hbs',{
    title: 'home'
  })
});

app.get('/about', (req,res) => {
  // res.send('About page');
  res.render('about.hbs',{
    title: 'ABOUT PAGE'
  });
})
app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
