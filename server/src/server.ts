import express from 'express';
import { routes } from './routes';

const app = express();

// Next line NEEDS to be before the definition of routes !
// tells express to check for JSON inside the request body
app.use(express.json());
app.use(routes);

// app will listen on port 3333 and will run arrow function when server is up
app.listen(3333, () => {
    console.log("HTTP server running !");
});