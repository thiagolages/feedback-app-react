import { ChatTeardropDots } from 'phosphor-react'; // for icons
import { Popover } from '@headlessui/react';

// In this Component, we added the Popover component from the HeadlessUI library (made by Tailwind devs)
// to improve our application in terms of Accessibility
// It automatically adds the 'aira' tags and tells users who are using screen readers which elements were changed, 
// which elements were added, etc. It also allows better keyboard controls like Esc to remove popups, etc.

// <div>    has been replaced with <Popover>
//  <p>     has been replaced with <Popover.Panel>
// <button> has been replaced with <Popover.Button>

// useState() now is not necessary anymore
// onClick() is not used anymore, since we're using a Popover.Button instead of an HTML <button>

export function Widget(){

    
    return (
        <Popover className='absolute bottom-5 right-5'>
            
            <Popover.Panel>Hello World</Popover.Panel>

            <Popover.Button className='bg-brand-500 rounded-full px-3 h-16 text-white flex items-center group'>
                <ChatTeardropDots className="w-10 h-10"/>

                <span className='max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear'>
                    Feedback
                </span>
            </Popover.Button>
        </Popover>
    )
}