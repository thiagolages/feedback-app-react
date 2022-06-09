/**
* Why we created an arrow function?*
* - We need to pass a function to our button's onClick property
* - If we simply use onClick={setFeedbackType} we will pass the function, but not the argument that
* we want (key), which is the value chosen by the user.
* - If we use onClick={setFeedbackType(key)}, we will be calling the function right away, and we'll pass
* its return value to onClick()
* - That's why we need to create an arrow function. The following:
* () => setFeedbackType (key)
* is a function, and not a function call. So, passing it to onClick, as in:
* onClick={ () => setFeedbackType(key) }
* is what we want: passing the function, the argument, but without actually calling the function.
* -------------------------
* Another note:
* just assigning 'key' doesn't automatically tell the script which type it is.
* so we are adding 'as FeedbackType' to manually force it to be either "BUG", "IDEA" or "OTHER"
*/

import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";

// this will tell (via Typescript syntax) that this component receives a 'FeedbackType' as a property
interface FeedbackTypeStepProps{ // the Component name with 'Props' at the end
    onFeedbackTypeChanged: (type: FeedbackType) => void; // 'onFeedbackTypeChanged' was a name we chose, it could be any name
}

export function FeedbackTypeStep(props: FeedbackTypeStepProps) {

    return (
        // since we want to keep the header here as well, and React doesn't allow us to 
        // return 2 HTML tags, we have to use a 'fragment', which are the angular brackets
        // that serve for the sole purpose of wrapping both tags into one, and is NOT shown in the final HTML
        
        // fragment begin
        <>
            <header>   
                <span className="txt-xl leading-6">Leave your Feedback</span>
                <CloseButton/> 
            </header>

            <div className="flex py-8 gap-2 w-full items-center">
                {/* using {} to insert JS code */}
                
                { Object.entries(feedbackTypes).map(([key, value]) => {
                    return (
                        <button
                            // React needs to know which element is which. Without a unique key, all buttons generated for each 
                            // element of the list are 'the same', because they don't have an ID to distinguish them from each other
                            key={key}
                            className="bg-zinc-800 rounded-lg py-5 w-24 gap-2 
                            flex flex-col flex-1 items-center
                            border-2 border-transparent hover:border-brand-500 
                            focus:border-brand-500 focus:outline-none"
                            // why we created an arrow function?* and why we used 'as FeedbackType'? read comments above
                            onClick={() => props.onFeedbackTypeChanged(key as FeedbackType)} 
                            type="button"
                        >
                            <img className={value.style} src={value.image.source} alt={value.image.alt}/>
                            <span>{value.title}</span>
                        </button>
                    )
                    })
                }            
            </div>
        </> //fragment end
    );

}