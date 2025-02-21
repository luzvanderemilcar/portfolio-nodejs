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

// Format contact link
function formatContactLink(contactData) {
  let hrefPrefix = {
    telephone: "tel:",
    email: "mailto:",
    website: "https://"
  };
let contactLinkInfo = [];

  for (let link in contactData) {

    // format a link for the contact
   if (/phone/gi.test(link)) {
    contactLinkInfo.push({
     name : link,
     value : contactData[link],
     href: hrefPrefix.telephone + contactData[link],
     icon: "assets/icons/Telephone.svg"
   });
}
   else if (/e?mail/gi.test(link)) {
    contactLinkInfo.push({
      name : link,
      value : contactData[link],
      href: hrefPrefix.email + contactData[link],
      icon: "assets/icons/Email.svg"
    });
}
   else if (/(site|web)/gi.test(link)) {
    contactLinkInfo.push({
      name : link,
      value : contactData[link],
      href: /https?/g.test(contactData[link]) ? "" : hrefPrefix.website + contactData[link],
      icon: "assets/icons/Website.svg"
    });
} else {
    contactLinkInfo.push({
      name : link,
      value : contactData[link],
      href: contactData[link],
      icon: ""
    });
   }
  }
return contactLinkInfo;
}

const contactLinks = formatContactLink(contact);

const router = express.Router();

router.get('/', (req, res) => { 
  res.render("pages/about", {title:  "about", firstHeading: "About me", education, contactLinks, ...header, ...mainContent, ...footer});
});

export default router;
