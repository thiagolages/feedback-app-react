import express from 'express';
import nodemailer from 'nodemailer'
import { prisma } from './prisma';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

// Recap of HTTP methods:
// GET      = Fetch information
// POST     = Insert information
// PUT      = Update an entity info
// PATCH    = Update a single entity info
// DELETE   = Delete an information


// In order to use express in a separate 'routes' file, we need to call express.Router()
// This way, in our other files, such as 'server.ts', we can use 'app.use(routes)'
export const routes = express.Router();

// configuring nodemailer to send emails
const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "fb504631c0f186",
    pass: "2865fc0fafa5bb"
  }
});

// app.method ('/resource')
routes.post('/feedbacks', async (req, res) => { // async will allow us to use 'await' inside the function

    const { type, comment, screenshot } = req.body;

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksRepository);


    submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot
    });



    // // wait for the email to be sent
    // await transport.sendMail({
    //     from: "Feedget Team <oi@feedget.com>",
    //     // in development, this will just show up in our 'mailtrap.io' service to visualize, so it doesn't have to be a valid email
    //     // in production, this will actually be sent, so it needs to be a valid email address
    //     to: "Thiago Lages <thiagolagesrocha@gmail.com>", 
    //     subject: "New Feedback",
    //     // body of the email
    //     html: [
    //     `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
    //     `<p>Feedback type: ${type}</p>`,
    //     `<p>Comment: ${comment}</p>`,
    //     `</div>`,
    //     ].join('\n'),
    // });

    return res.status(201).send(); // 201 will tell that a new resource was created in the backend

})