import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import homeRouter from "./routes/home.js";
import projectRouter from "./routes/projects.js";
import aboutRouter from "./routes/about.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// set view folder location  
app.set('views', './src/views')

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.use('/', homeRouter);
app.use('/projects', projectRouter);
app.use('/about', aboutRouter);

// Configuration server port

app.listen(port, () => { console.log(`Server listening on port ${port}`)
});
