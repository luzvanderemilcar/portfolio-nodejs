import express from "express";
import { titlecase, uppercase, lowercase, capitalcase } from "../utils/case.js";
import {isHeading, isBoolean, isSchoolName } from "../utils/testValue.js";
import cvData from "../assets/data/cvData.js";

let { header, resume, education, contact, mainContent, footer } = cvData;

const educationList = education?.list?.map(listItem => { 
 let formattedListItem = {};
 
 for (let key in listItem ) { 
   if ( !isHeading(key) && !isSchoolName(key)) {
        let newKey = capitalcase(key);
	formattedListItem[newKey] = capitalcase(listItem[key]);
   }
   else if (isHeading(key)) {
	formattedListItem.heading = titlecase(listItem[key]);
   }
   else if (isSchoolName(key)) { 
	formattedListItem.schoolName = titlecase(listItem[key]);
   }
}
return formattedListItem;
});

education.list = educationList;

const router = express.Router();

router.get('/', (req, res) => { 
  res.render("pages/about", {title:  "about", firstHeading: "About me", education, ...header, ...mainContent, ...footer});
});

export default router;
