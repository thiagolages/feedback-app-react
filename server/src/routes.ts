import express from 'express';
import { NodeMailerMailAdapter      }   from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository  }   from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase      }   from './use-cases/submit-feedback-use-case';

// Recap of HTTP methods:
// GET      = Fetch information
// POST     = Insert information
// PUT      = Update an entity info
// PATCH    = Update a single entity info
// DELETE   = Delete an information


// In order to use express in a separate 'routes' file, we need to call express.Router()
// This way, in our other files, such as 'server.ts', we can use 'app.use(routes)'
export const routes = express.Router();

// app.method ('/resource')
routes.post('/feedbacks', async (req, res) => { // async will allow us to use 'await' inside the function

    const { type, comment, screenshot } = req.body;

    // Dependency Inversion: instead of having our Use Case request its dependencies (in this case, Prisma)
    // we are sending prisma as a dependency to the use case. In that way, if we ever change Prisma for a new
    // technology, we just have to pass it to 

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const nodeMailerMailAdapter     = new NodeMailerMailAdapter();

    const submitFeedbackUseCase     = new SubmitFeedbackUseCase(
        prismaFeedbacksRepository,
        nodeMailerMailAdapter
    );

    submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot
    });

    return res.status(201).send(); // 201 will tell that a new resource was created in the backend

})