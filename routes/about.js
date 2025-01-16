import express from "express";

const route = express.Router();

route.get('/', (req, res) => { 
  res.render("pages/about", {title:  "about", tagline: "About", firstHeading: "About me"});
});

export default route;
