import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { api } from "../../../lib/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../../Loading";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStepProps{
    feedbackType: FeedbackType;
    onFeedbackRestartRequest: () => void;
    onFeedbackSend: () => void;
}

export function FeedbackContentStep({
    feedbackType, 
    onFeedbackRestartRequest, 
    onFeedbackSend

}: FeedbackContentStepProps) {
    // in order to access each element in the 'FeedbackType' object, we do:
    const  feedbackTypeInfo = feedbackTypes[feedbackType];
    
    const [screenshot, setScreenshot]   = useState<string | null>(null);
    const [comment, setComment]         = useState<string | null>('');
    const [isSendingFeedback, setIsSendingFeedback  ] = useState(false);
    const [isTakingScreenshot, setIsTakingScreenshot] = useState(false); // to show loading image while the screenshot is being taken

    async function handleSubmitFeedback(event:FormEvent){

        event.preventDefault(); // prevent the default behaviour of refreshing the page when submitting the form

        setIsSendingFeedback(true);
        await api.post('/feedbacks',{
            type: feedbackType,
            comment,
            screenshot
        })
        setIsSendingFeedback(false);
        onFeedbackSend();
    }

    return (
        <>
            <header>
                <button type="button" 
                        className="top-4 left-5 absolute text-zinc-400 hover:text-zinc-100"
                        onClick={onFeedbackRestartRequest}
                >
                    <ArrowLeft weight="bold" className="h-4 w-4"/>
                </button>

                <span className="txt-xl leading-6 flex items-center gap-2">
                    <img src={feedbackTypeInfo.image.source}  
                         alt={feedbackTypeInfo.image.alt}
                         className="w-6 h-6" 
                     />
                    {feedbackTypeInfo.title}
                </span>

                <CloseButton/> 

            </header>

            {/* margin top and bottom */}
            <form 
                onSubmit={handleSubmitFeedback}
                className="my-4 w-full">
                    <textarea
                        className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
                        placeholder="Conte com detalhes o que está acontecendo..."
                        onChange={ event => setComment(event.target.value)} // update comment with anything the user types
                    />

                <footer className="flex gap-2 mt-2">

                <ScreenshotButton
                    screenshot={screenshot}
                    onScreenShotTake={setScreenshot}
                    isTakingScreenshot={isTakingScreenshot}
                    setIsTakingScreenshot={setIsTakingScreenshot}
                />

                    <button
                        type="submit"
                        disabled={comment?.length === 0 || isSendingFeedback || isTakingScreenshot}
                        className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
                    >
                        {isSendingFeedback? <Loading/> : 'Send feedback'}
                    </button>
                    
                </footer>

            </form>

            
        </> //fragment end
    );
    
}