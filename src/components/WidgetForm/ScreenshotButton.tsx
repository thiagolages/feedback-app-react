import html2canvas from "html2canvas";
import { Camera } from "phosphor-react";
import { useState } from "react";

export function ScreenshotButton(){

    const [isTakingScreenshot, setIsTakingScreenshot] = useState(false); // to show loading image while the screenshot is being taken

    async function handleTakeScreenshot(){

        setIsTakingScreenshot(true);

        // ! at the end forces it to 'accept' that it will always find a 'html' tag. The function by default considers the case where we don't find any html tag
        const canvas = await html2canvas(document.querySelector('html')!); 
        const base64iamge = canvas.toDataURL('image/png'); // convert the image to a base64 textual representation of it

        setIsTakingScreenshot(false);
    }

    return (
     <button 
        type="button"
        onClick={handleTakeScreenshot}
        className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 disabled:opacity-50 disabled:hover:bg-brand-500"
    >
        <Camera className="w-6 h-6"/>
    </button>
);
}