import dotenv from "dotenv";
import express from "express";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// set view folder location  
app.set('views', './src/views')

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render("pages/index", {title: "welcome", tagline: "positive", firstHeading: "Welcome aboard" });
});

app.get('/projects', (req, res) => { 

let webApps = [
	{id: 1, title:"Javascript multitimer" , githubLink : ""}, 
	{id: 2, title:"Javascript BMI calculator" , githubLink : ""}, 
	{id: 3, title:"Javascript calculatorr" , githubLink : ""}
]; 
  res.render("pages/projects", {title: "projects", tagline: "Projects", firstHeading: "Find out interesting projects", webApps : webApps});
})

app.get('/about', (req, res) => { res.render("pages/about", {title:  "about", tagline: "About", firstHeading: "About me"});
});


// Configuration server port

app.listen(port, () => { console.log(`Server listening on port ${port}`)
})
