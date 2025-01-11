require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// set view folder location  
app.set('views', './src/views')

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render("pages/index", {title: "welcome", tagline: "positive", firstHeading: "Welcome aboard" });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

