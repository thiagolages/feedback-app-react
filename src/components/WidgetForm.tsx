import { useState } from "react";
import { CloudFog } from "phosphor-react";

import bugImageUrl from '../assets/bug2.png';
import ideaImageUrl from '../assets/idea.png';
import thoughtImageUrl from '../assets/thought.png';

import { CloseButton } from "./CloseButton";

const feedbackTypes = {

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
// using Object.entries(feedbackTypes) returns an array of arrays => 
/*[ 
* ['BUG', {...}], 
* ['IDEA', {...}] , 
* ['OTHER', {...}] 
* ]
* where the first element is the key, and second is the value
*/

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

/**
 * In order to allow the user to select only the feedback types that we want, we're going to create
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

type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm(){
    
    // we're telling the script that feedbackType can be either "BUG", "IDEA", "OTHER" or null
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null); // will store the user's chosen feeback type

    return (  
        <div className="bg-zinc-700 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
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
                            onClick={() => setFeedbackType(key as FeedbackType)} 
                            type="button"
                        >
                            <img className={value.style} src={value.image.source} alt={value.image.alt}/>
                            <span>{value.title}</span>
                        </button>
                    )
                    })
                }
            </div>
            <footer className="text-xs text-neutral-400">
                Made with ♥ by <a className="underline underline-offset-2" href="https://github.com/thiagolages">Thiago Lages</a>
            </footer>
        </div>
    )
}