import { ChatTeardropDots } from 'phosphor-react'; // for icons
import { Popover } from '@headlessui/react';
import { WidgetForm } from './WidgetForm'; // automatically imports the folder's 'index' file

// Figma URL: https://www.figma.com/file/PG2VUwAZb4QeZ14jVDKRLB/Feedback-Widget?node-id=10%3A1637

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
        // flex-col: we want the header, content, and the footer to be on top of each other, not side by side
        // items-end: items aligned to the right (end)
        // md:bottom-8 md:right-8: for medium (md) sized screen, keep bottom and right distances at 8*0.25rem
        <Popover className='absolute bottom-4 right-4 md:bottom-8 md:right-8 flex flex-col items-end'>
            
            <Popover.Panel>
                <WidgetForm/>
            </Popover.Panel>

            <Popover.Button className='bg-brand-500 rounded-full px-3 h-16 text-white flex items-center group'>
                <ChatTeardropDots className="w-10 h-10"/>
                <span className='max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear'>
                    Feedback
                </span>
            </Popover.Button>
        </Popover>
    )
}