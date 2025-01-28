import express from "express";
import bodyParser from "body-parser";
import { getObjectById, getObjectByKeyValue, matchValueArray, findByIdAndUpdateKeyValue, findByIdAndUpdate, copyKeys, sequenceArray, removeObjectAt, removeObjectById, testKeyValue, aggregateItems } from "../utils/processArrayOfObjects.js";
import cvData from "../assets/data/cvData.js";

let { header, resume, contact, mainContent, projects, footer } = cvData;

const router  = express.Router();

router.use(bodyParser.urlencoded({extended: true}));

router.use(express.static('public'));

const allProjects = aggregateItems(projects, "items");

router.get('/', (req, res) => { 
  res.render("pages/projects", {title: "projects", tagline: "Projects", firstHeading: "Find out interesting projects", projects: projects, ...footer});
});


// router for specific project 
router.route("/:id")
  .get((req, res) => {

        res.render("pages/projectItem", {title: "project item", project: req.matchProject, ...footer });
});

// middleware to find the project item relating to the request

router.param("id", (req, res, next, id) => {
      allProjects.some((project, idx) => {
       if ( project.id == id) {
          req.projectId = id;
          req.matchProject = project;
          return true;
                }
        });
      next();
}); 


export default router;
