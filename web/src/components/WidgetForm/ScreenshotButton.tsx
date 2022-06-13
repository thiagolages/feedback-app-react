import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import React, { useState } from "react";
import { Loading } from "../Loading";

interface ScreenShotButtonProps{
    screenshot: string | null;
    onScreenShotTake: (screenshot: string | null) => void;
    isTakingScreenshot: boolean;
    setIsTakingScreenshot: React.Dispatch<React.SetStateAction<boolean>> ;

}
                   // instead of props: ScreenShotButtonProps
export function ScreenshotButton({ screenshot, onScreenShotTake, isTakingScreenshot, setIsTakingScreenshot }: ScreenShotButtonProps){

    // const [isTakingScreenshot, setIsTakingScreenshot] = useState(false); // to show loading image while the screenshot is being taken

    async function handleTakeScreenshot(){
        setIsTakingScreenshot(true);
        
        // ! at the end forces it to 'accept' that it will always find a 'html' tag. The function by default considers the case where we don't find any html tag
        const canvas = await html2canvas(document.querySelector('html')!); 
        const base64image = canvas.toDataURL('image/png'); // convert the image to a base64 textual representation of it

        onScreenShotTake(base64image); // instead of props.onScreenShotTake(base64image);

        setIsTakingScreenshot(false);
    }

    if (screenshot){
        return (
            <button
                type="button"
                className="p-1 h-10 w-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
                style={{
                    backgroundImage: `url(${screenshot})`,
                    // next 2 lines just to show something on the preview, since our website is black.
                    // if using on real applications, remove them !
                    backgroundPosition: 'right bottom',
                    backgroundSize: 180,
                }}
                onClick={() => onScreenShotTake(null)} // whenever we click  the trash button, set screenshot to null (erase it)
                >
                <Trash weight="fill"/>
            </button>
        );
    }

    return (
     <button 
        type="button"
        onClick={handleTakeScreenshot}
        className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 disabled:opacity-50 disabled:hover:bg-brand-500"
    >
        { isTakingScreenshot ? <Loading/> : <Camera className="w-6 h-6"/> }
    </button>
);
}