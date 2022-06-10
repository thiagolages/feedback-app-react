// Component: basically a function that returns HTML code

import { Widget } from "./components/Widget";

export function App() { // removing 'default' so we can't import it with other names by mistake

  return (<Widget/>)
  // return (<WidgetWithNoAccessibility/>)

  // next return was used to train a few concepts
  // return (
  // <div className="flex gap-2">
  //   <Button text="Enviar"/>
  //   <Button text="OK"/>
  //   <Button />
  // </div>
  // )
}

interface ButtonProps{
  text?: string;// question mark (?) shows that this is optional
}

/* notes
  *To show a JS  variable inside HTML,  use {}
  *For a default value of a property, use '??'
  *use of 'className' instead of 'class' because it's a reserved word
  *classes inside 'className' are from tailwind
  *'p-1' indicates a padding of 1*(0.25*rem). 'rem' is a relative measurement
  *1 rem  = 16px (default font size)
  *0.25rem= 4px (minimum distance used by tailwind)
  *so 'p-1' = 0.25rem = 4px, 'p-2' = 0.5rem = 8px, and so on..
  *h-10 -> height = 10*0.25rem = 10*4px = 40px
  *rounded -> rounded borders
  *
  *to include custom colors, use [], e.g.: bg-[#8257e6], instead of bg-violet-500
*/

function Button (props: ButtonProps){

    return (
    <div>
      {/* the following button style was created using tailwind properties directly */}
      <button className="bg-violet-500 p-2 h-10 rounded">{props.text ?? "Default"}</button>
      <br />
      {/* the following button style was created using normal CSS, defining a class named 'button' and
          defining the class style inside a CSS file (global.css, but it could be any other)*/}
      <button className="button">{props.text ?? "Default"}</button>
       <br />
      {/* they look the same, just showing different ways of doing the same thing */}

      <button className="hover:bg-violet-700 transition-colors bg-violet-500 p-2 h-10 rounded">{props.text ?? "Default"}</button>
    </div>
    )
}