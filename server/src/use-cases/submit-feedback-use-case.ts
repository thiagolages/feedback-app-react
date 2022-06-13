// we're recreating the 'FeedbackCreateData' to separate what's the Data layer from the Application layer.
// Separating data that we'll actually use in the application (that will be sent to the database), 
// from the data that we're using in this test case. 
// Maybe, during development, we need to receive something else other than the data contained
// in 'FeedbackCreateData'. So we are redefining it here

import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest{
    type        : string,
    comment     : string;
    screenshot ?: string;
}

export class SubmitFeedbackUseCase {

    private feedbacksRepository: FeedbacksRepository;
    private mailAdapter: MailAdapter;

    constructor(
        feedbacksRepository: FeedbacksRepository,
        mailAdapter: MailAdapter,
    ){
        this.feedbacksRepository= feedbacksRepository;
        this.mailAdapter        = mailAdapter;
    }

    async execute(request: SubmitFeedbackUseCaseRequest){// could be 'handle', 'run', etc
        const { type, comment, screenshot }  = request;

        if (!type){
            throw new Error('Type is required.');
        }
        
        if (!comment){
            throw new Error('Comment is required.');
        }

        if (screenshot && ! screenshot.startsWith('data:image/png;base64')){
            throw new Error('Invalid screenshot format.')
        }

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot
        })

        await this.mailAdapter.sendMail({
            subject: `[${type}]New feedback`,
            body:[
                `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                screenshot ? `<img src="${screenshot}"/>` : null,
                `</div>`,
            ].join('\n'),
        });
    }
}


// the followin code:
/*
    private feedbacksRepository: FeedbacksRepository;
    constructor(
        feedbacksRepository: FeedbacksRepository,
    ){
        this.feedbacksRepository = feedbacksRepository;
    }
*/
// could've been replaced by:
/**
    constructor(
        private feedbacksRepository: FeedbacksRepository,
    ) {}
*/

/**
    We could've used the code below, BUT
    - it would be dependent of PRISMA, in this case, which we're using now.
    - it we were to change it later, we would have to call another function that
    implemented a new object that used a new framework/technology, etc., example:
    'Mapris' framework (just another name), would implement 
    - MaprisFeedbacksRepository
    - we would have to use:
    const maprisFeedbackRepository = new MaprisFeedbackRepository();
    (...)
    and the maintainability of our code would be awful !
    - That's why we implemented the code above this comment:
    to DO NOT rely on a single technology, library, etc.
    Whatever class that implements 'FeedbacksRepository' (our contract)
    would be able to work with our code.


    export class SubmitFeedbackUseCase {
        async execute(request: SubmitFeedbackUseCaseRequest){// could be 'handle', 'run', etc
            const { type, comment, screenshot }  = request;

            const prismaFeedbackRepository = new PrismaFeedbacksRepository();
            await prismaFeedbackRepository.create({
                data: {
                    type,
                    comment,
                    screenshot,
                }
            })
        }
}

 */