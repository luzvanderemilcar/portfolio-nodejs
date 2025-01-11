import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
let webApps = [
        {id: 1, title:"Javascript multitimer" , githubLink : ""},
        {id: 2, title:"Javascript BMI calculator" , githubLink : ""},
        {id: 3, title:"Javascript calculatorr" , githubLink : ""}
];

// set view folder location  
app.set('views', './src/views')

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render("pages/index", {title: "welcome", tagline: "positive", firstHeading: "Welcome aboard" });
});

app.get('/projects', (req, res) => { 

  res.render("pages/projects", {title: "projects", tagline: "Projects", firstHeading: "Find out interesting projects", webApps : webApps});
})

// route for specific project 
app.get("/projects/:id", (req, res) => {
	let {id:projectId} = req.params ;
	console.log(projectId)

	let project = webApps.find(app => app.id === projectId);

res.render("pages/projectItem", project) //.status("code": 200, "message: "okay");
});
app.get('/about', (req, res) => { res.render("pages/about", {title:  "about", tagline: "About", firstHeading: "About me"});
});


// Configuration server port

app.listen(port, () => { console.log(`Server listening on port ${port}`)
})

