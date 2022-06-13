import { useState } from "react";
import { CloudFog } from "phosphor-react";

import bugImageUrl from '../../assets/bug2.png';
import ideaImageUrl from '../../assets/idea.png';
import thoughtImageUrl from '../../assets/thought.png';

import { CloseButton } from "../CloseButton";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

/*  notes about properties used in WidgetForm
    * ***** used in first div *****
    * rounded-2xl: rounded with 1rem, or 16px
    * mb: margin-bottom; we want the form to stay away from the button area
    * flex-col: we want the header, content, and the footer to be on top of each other, not side by side
    * items-center: centralize contents
    * shadow-lg: shadow on each item to create an illusion of it being distanced from the background
    * w-[calc(100vw-2rem)]: calculating the width using tailwnid. 
    *         100vw = 100% of  viewport (total available view)
    *         -2rem = since we're using padding of (p-4), we're shrinking its size a little
    * sm, md, lg: small, medium, large (screen sizes)
    * ***** used in button *****
    * bg-zinc-800 : backgound color zinc
    * rounded-lg : rounded large
    * py-5 : padding y
    * w-24 : width
    * gap-2 : gap between icon and text
    * flex : makes elements flexbox
    * flex-col : makes img and text stay on top of each other
    * flex-1 : since the parent element (in this case, div) is 'flex', flex-1 will expand its width (beyond the defined w-24) in case the parent element container is bigger
    * items-center: center img and txt inside the button      
    * border-2 : creates a white border with 2px, to change colors when we hover
    * border-transparent : makes the white border transparent so it doesn't show up
    * hover:border-brand-500 : makes the border show in color brand-500 when we hover the button
    * focus:border-brand-500 : when the user is navigating using the keyboard. but the color by default is white, so we use the next one:
    * focus:outline-none : to remove the white default border, and use our own color 
*/

/* In order to allow the user to select only the feedback types that we want, we're going to create
 *
 * a new type with only the options that we defined in the object 'feedbackTypes'
 * type: from TypeScript, we are defining a new type
 * typeof: return the types of data contained in our object 'feedbackTypes'*
 * keyof: finally, keyof will return only the keys of our object, which are "BUG", "IDEA" and "OTHER"
  
  *typeof returns something like this:   
    BUG: {
            title: string;
            style: string;
            image: {
                source: string;
                alt: string;
            };
        };
        (...) // same thing for other entries in our 'feedbackTypes' object
    
 */

export const feedbackTypes = {

    BUG:{
        title: 'Bug',
        style: 'w-12 h-12',
        image: {
            source: bugImageUrl,
            alt: 'Image of a bug'
        }
    },
    IDEA:{
        title: 'Idea',
        style: 'w-12 h-12',
        image: {
            source: ideaImageUrl,
            alt: 'Image of a lamp'
        }
    },
    OTHER:{
        title: 'Other',
        style: 'w-12 h-12',
        image: {
            source: thoughtImageUrl,
            alt: 'Imagem of a thinking bubble'
        }
    }

}

/* using Object.entries(feedbackTypes) returns an array of arrays => 
 *[ 
* ['BUG', {...}], 
* ['IDEA', {...}] , 
* ['OTHER', {...}] 
* ]
* where the first element is the key, and second is the value
*/

export type FeedbackType = keyof typeof feedbackTypes;


export function WidgetForm(){
    
    // we're telling the script that feedbackType can be either "BUG", "IDEA", "OTHER" or null
    const [feedbackType, setFeedbackType ] = useState<FeedbackType | null>(null); // will store the user's chosen feeback type
    const [feedbackSent, setFeedbackSent ] = useState (false);

    function handleRestartFeedback(){
        setFeedbackSent(false);
        setFeedbackType(null);
    }

    return (
        <div className="bg-zinc-900 gap-2 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            
            {/* since the header will be different for each option, we're moving it to FeedbackTypeStep */}

            {/* content */}
            { feedbackSent ? 
                <FeedbackSuccessStep
                    onFeedbackRestartRequest={() => handleRestartFeedback()}
                />
                :
               <>
                    {!feedbackType ? (
                        <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType}/>
                    ) : (
                        <FeedbackContentStep 
                            feedbackType={feedbackType}
                            onFeedbackRestartRequest={handleRestartFeedback}
                            onFeedbackSend={ () => setFeedbackSent(true) }
                        />
                    ) }
               </>
            }
            {/* end of content */}

            <footer className="text-xs text-neutral-400">
                Made with ♥ by <a className="underline underline-offset-2" href="https://github.com/thiagolages">Thiago Lages</a>
            </footer>
        </div>
    )
}