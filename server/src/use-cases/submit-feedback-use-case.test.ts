// this file could have extension .test.js or .spec.js

import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";


const createFeedbackSpy = jest.fn(); // spy function. doesn't do anything but allow  us to know WHEN and IF it was called
const sendMailSpy       = jest.fn();

// we WON'T be sending as arguments any dependencies of our project
// unit testing should be done isolated from the rest of the code
// we will be sending mock objects with empty implementations of the 
// defined functions like 'create' and 'sendMail'
const submitFeedback = new SubmitFeedbackUseCase(
    { create:   createFeedbackSpy },
    { sendMail: sendMailSpy }
);


// 'describe' groups many tests in a category
describe('Submit feedback', () =>{

    // 'it' is equivalent to 'test'. helps to build more readable code
    // this is an async function because submitFeedback.execute() is async
    
    // Test 1
    it('should be able to send a feedback', async () =>{
        // using 'await' because 'submitFeedback.execute' is async
        await expect(submitFeedback.execute({
        
            type: 'BUG',
            comment: 'Example comment for unit testing',
            screenshot: 'data:image/png;base64/test.jpg', // this could be anything, because we're not validating
        
        })).resolves.not.toThrow();
        // 'resolves' means doesn't reject; to go throught the function and end it
        // '.not.toThrow()' means doesn't throw any errors

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();

    });

    // Test 2
    it('should NOT be able to send a feedback without a type', async () =>{

        await expect(submitFeedback.execute({
        
            type: '',
            comment: 'Example comment for unit testing',
            screenshot: 'data:image/png;base64/test.jpg', // this could be anything, because we're not validating
        })).rejects.toThrow();
    });

    // Test 3
    it('should NOT be able to send a feedback without a comment', async () =>{

        await expect(submitFeedback.execute({
        
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64/test.jpg', // this could be anything, because we're not validating
        })).rejects.toThrow();
    });

     // Test 4
    it('should NOT be able to send a feedback without a valid schreenshot format', async () =>{

        await expect(submitFeedback.execute({
        
            type: 'BUG',
            comment: 'comment',
            screenshot: 'test.jpg', // this could be anything, because we're not validating
        })).rejects.toThrow();
    });

})