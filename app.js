import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
console.log(process.env.PORT);

let webApps = [
        {id: 1, title:"Javascript multitimer" , description:  "A timer with the ability to handle multiple timer simultaneously", summary:  "I was not planning to do a timer at the first place  but as I was developing, and was adding more features, it was ckear that it was important. I came across a lot of timer application and I think, it is the pinch of salt they needed", githubLink : "", imageUrl: ""},
        {id: 2, title:"Javascript BMI calculator", description:  "A javascript Body Mass Index (BMI)  calculator that produce a summary and provide good advice accordingly", summary:  "I was not planning to do  at the first place  but as I was developing, and was adding more features, it was clear that it was important. I came across a lot of calculator application and I think, it is the pinch of salt they needed", githubLink : "", imageUrl: ""},
        {id: 3, title:"Javascript calculator" ,  description:  "A javascript calculator developed with React", summary:  "I was not planning to do  at the first place  but as I was developing, and was adding more features, it was clear that it was important. I came across a lot of calculator application and I think, it is the pinch of salt they needed", githubLink : "", imageUrl: ""}
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
});

app.post("/projects", (req, res) => {
        let {title, descrition,  summary, codeLink } = req.body;
        let id = webApps.at(-1).id +1;

        let newApp = {id, title, descrition, summary, codeLink};
         webApps.push(newApp);
        res.redirect("/projects/" + id, );

});

app.get("/projects/add", (req, res) => {
 res.render("pages/addProject", {title: "add project", tagline: "Add to projects", "firstHeading" : "Add a new project to the store of projects"});
});

// route for specific project 
app.route("/projects/:id")
  .get((req, res) => {
	let {id:projectId} = req.params ;

	let project = webApps.find(app => app.id == projectId);

res.render("pages/projectItem", {title: "project item", project: project }) //.status("code": 200, "message: "okay");
})

 .patch((req, res) => {
        let {id:projectId} = req.params ;
	let matchIndex ;
        let project = webApps.find((app, index) => {

		if ( app.id == projectId) {
			matchIndex = index;
			return true;
		}

	});
		console.log(matchIndex, project);
		res.sendStatus(200);
});


app.get('/about', (req, res) => { res.render("pages/about", {title:  "about", tagline: "About", firstHeading: "About me"});
});


// Configuration server port

app.listen(port, () => { console.log(`Server listening on port ${port}`)
})

