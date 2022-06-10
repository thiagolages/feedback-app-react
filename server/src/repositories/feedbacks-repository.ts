// specifying which fields and types of data our FeedbacksRepository expects
export interface FeedbackCreateData {
    type:       string;
    comment:    string;
    screenshot?:string;
}

export interface FeedbacksRepository{
    // This interface specifies which actions my application can make 
    // with the feedbacks from the database

    // only one method called 'create', that expects FeedbackCreateData in the field 'data'
    // return: instead of returning void, since it's an sync function, it has to return Promise<void>
    // this way, if we implement it in other classes, etc. it will give an error and say that the function
    // has to be async to be correctly implemented
    create: (data: FeedbackCreateData) => Promise<void>;
}