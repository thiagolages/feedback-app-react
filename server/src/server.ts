import express from 'express';
import { allowedNodeEnvironmentFlags } from 'process';

const app = express();

app.get('/users', (req, res) => {

    return res.send('Hello World\n');

})

// app will listen on port 3333 and will run arrow function when server is up
app.listen(3333, () => {

    console.log("HTTP server running !");
});

// why we're using SQLite
// doesnt need to install anything up front
// we'll be using Prisma