import { useEffect, useRef } from "react";

const blackListedKeys = [
    "Control", "Meta", "Alt", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "Backspace", "Tab", "Escape", "Enter",
    "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12",
    "Insert", "Delete"
]

const useKey = (callback) => {

    const callbackRef = useRef(callback)

    useEffect(() => {
        callbackRef.current = callback
    })

    useEffect(() => {
        const handle = (ev) => {
            if(ev.type === "keyup" && ev.key === "Shift"){
                callbackRef.current(ev, ev.key)
                return
            }

            if(ev.repeat || blackListedKeys.includes(ev.key) || ev.ctrlKey || ev.altKey || ev.type === "keyup"){
                return
            }
            callbackRef.current(ev, ev.key)
        }
        
        window.addEventListener('keydown', (ev) => {
            if(ev.code === "Space" && ev.target === document.body){
                ev.preventDefault()
            }
        })
        document.addEventListener("keydown", handle)
        document.addEventListener("keyup", handle)

        return () => {
            document.removeEventListener("keydown", handle)
            document.removeEventListener("keyup", handle)
        }
    })
}

export default useKey