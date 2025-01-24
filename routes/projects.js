import express from "express";
import bodyParser from "body-parser";
import { getObjectById, getObjectByKeyValue, matchValueArray, findByIdAndUpdateKeyValue, findByIdAndUpdate, copyKeys, sequenceArray, removeObjectAt, removeObjectById, testKeyValue } from "../utils/processArrayOfObjects.js";
import cvData from "../assets/data/cvData.js";

let { header, resume, contact, mainContent, footer } = cvData;

const router  = express.Router();

let webApps = [
        {id: 1, title:"Javascript multitimer" , description:  "A timer with the ability to handle multiple timer simultaneously", summary:  "I was not planning to do a timer at the first place  but as I was developing, and was adding more features, it was clear that it was important. I came across a lot of timer application and I think, it is the pinch of salt they needed", githubLink : "", imageUrl: "", contributors: [{name: "Luzvander Emilcar", imageLink: "", details : "Luzvander is an 2 years experienced Web Developer. He praticipated on a broard range of projects, including the main Javascript language.", profileLink: ""}]},
        {id: 2, title:"Javascript BMI calculator", description:  "A javascript Body Mass Index (BMI)  calculator that produce a summary and provide good advice accordingly", summary:  "I was not planning to do  at the first place  but as I was developing, and was adding more features, it was clear that it was important. I came across a lot of calculator application and I think, it is the pinch of salt they needed", githubLink : "", imageUrl: ""},
        {id: 3, title:"Javascript calculator" ,  description:  "A javascript calculator developed with React", summary:  "I was not planning to do  at the first place  but as I was developing, and was adding more features, it was clear that it was important. I came across a lot of calculator application and I think, it is the pinch of salt they needed", githubLink : "", imageUrl: ""}
];

router.use(bodyParser.urlencoded({extended: true}));

router.use(express.static('public'));

router.get('/', (req, res) => { 
  res.render("pages/projects", {title: "projects", tagline: "Projects", firstHeading: "Find out interesting projects", webApps : webApps, ...footer});
});

router.post("/", (req, res) => {
        let {title, description,  summary, codeLink } = req.body;
        let id = webApps.at(-1).id +1;

        let newApp = {id, title, description, summary, codeLink};
         webApps.push(newApp);
        res.redirect(req.baseUrl);
});


router.get("/add", (req, res) => {
 res.render("pages/addProject", {title: "add project", tagline: "Add to projects", "firstHeading" : "Add a new project to the store of projects"});
});

// router for specific project 
router.route("/:id")
  .get((req, res) => {

        res.render("pages/projectItem", {title: "project item", project: req.matchProject });
})
 .patch((req, res) => {

	webApps = [...webApps.slice(0, req.matchIndex), {...req.matchProject, ...req.body},...webApps.slice(req.matchIndex-1)];
	let updatedProject = webApps[matchIndex];

	res.redirect(req.originalUrl);
	
})
 .delete((req, res) => {
	webApps = webApps.filter((app, index) => index != req.matchIndex);
console.log(req.baseUrl);        
res.redirect("/projects");
        
});

// middleware to find the project item relating to the request

router.param("id", (req, res, next, id) => {
      let matchIndex ;
      let project = webApps.find((app, index) => {
                if ( app.id == id) {
                       req.matchIndex = index;
                        return true;
                }
        });
	req.projectId = id;
	req.matchProject = project;
      next();
}); 


export default router;
