import { useEffect, useRef } from "react";

const useKey = (callback) => {

    const callbackRef = useRef(callback)

    useEffect(() => {
        callbackRef.current = callback
    })

    useEffect(() => {
        const handle = (ev) => {
            callbackRef.current(ev, ev.key)
        }
        
        window.addEventListener('keypress', (ev) => {
            if(ev.code === "Space" && ev.target === document.body){
                ev.preventDefault()
            }
        })
        document.addEventListener("keypress", handle)

        return () => document.removeEventListener("keypress", handle)
    })
}

export default useKey