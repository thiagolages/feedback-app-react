import { Popover } from "@headlessui/react"
import { X } from "phosphor-react"

export function CloseButton(){

    // since this button will be placed inside the panel (which happens only when the Popover is OPEN)
    // as soon as we click it, it will CLOSE the panel

    // title used as a good description for screen readers
    return (
        <Popover.Button className="top-5 right-5 absolute text-zinc-400 hover:text-zinc-100"  title="Fechar formulário de feedback">
            <X weight="bold" className="w-4, h-4"/>
        </Popover.Button>
    )

}