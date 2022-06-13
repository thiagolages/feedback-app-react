import express from 'express';
import cors from 'cors'
import { routes } from './routes';

const app = express();

//tells which front-end addresses can consume our backend
app.use(cors()); 
// for now we'll  leave it open but ideally we would have something like:
// app.use(cors(
//     origin: 'http://mywebsite.com:3000'
// )); 

// Next line NEEDS to be before the definition of routes !
// tells express to check for JSON inside the request body
app.use(express.json());
app.use(routes);

// app will listen on port 3333 and will run arrow function when server is up
app.listen(3333, () => {
    console.log("HTTP server running !");
});