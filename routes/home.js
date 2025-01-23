import express from "express";
import cvData from "../assets/data/cvData.js";

let { header, resume, contact, mainContent, footer } = cvData;

const router = express.Router();

router.get('/', (req, res) => {
  res.render("pages/index", {title: "welcome", tagline: "positive", firstHeading: "Welcome aboard",...header, ...resume, ...footer });
});

export default router;

