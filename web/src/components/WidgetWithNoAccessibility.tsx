import { ChatTeardropDots } from 'phosphor-react'; // for icons
import { useState } from 'react';
import { Popover } from '@headlessui/react';

export function Widget(){

    // In React, whenever we have a state variable, React will keep an eye on these states and whenever they are
    // changed by the user trought some action, it renders the component again with the new state

    // first return is a stateful value (bool), and second is a function to change its state
    const [isWidgetOpen, setIsWidgetOpen] = useState(false) //state

    // the variable isWidgetOpen cannot be changed as a normal variable, with
    // isWidgetOpen = true
    // we need to change it via the function setIsWidgetOpen, so that React knows it has to render again

    function toggleWidgetVisibility() {
        setIsWidgetOpen(!isWidgetOpen)
    }

    // group: we defined that the whole thing (div-button-span) is a group, so that we could use
    // px: padding in the x axis; h: height
    // flex: makes both the icon and the <span> (with 'feedback' written) stay side by side, on a flexbox style
    // 'group-hover' inside <span> to increase the max width so we could show 'Feedback' on the widget
    // overflow-hidden: hides anything outside the component
    // ease-linear: make the animation linear and not slow in the beginning and accelerated afterwards
    return (
        <div className='absolute bottom-5 right-5'>
            {/* it's possible to insert conditionals inside HTML using {} */}
            { isWidgetOpen ? <p>Hello World</p> : null}
            {/*could be done this way: { isWidgetOpen && <p>Hello World</p> } */}
            
            {/* using curly brackets {} because we're inserting JS code inside HTML */}
            <button onClick={toggleWidgetVisibility} className='bg-brand-500 rounded-full px-3 h-16 text-white flex items-center group'>
                <ChatTeardropDots className="w-10 h-10"/>

                <span className='max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear'>
                    Feedback
                </span>
            </button>
        </div>
    )
}