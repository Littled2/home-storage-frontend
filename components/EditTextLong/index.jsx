'use client'

import { useOutsideAlerter } from "@/hooks/useOutsideAlerter"
import { useCallback, useEffect, useRef, useState } from "react"

import styles from "./edit.module.css"
import { usePocket } from "@/contexts/PocketContext"
import ReactTextareaAutosize from "react-textarea-autosize"

export function EditTextLong({ text, collection, id, field }) {

    const el = useRef()
    const inputEl = useRef()

    const [ edit, setEdit ] = useState(false)

    const [ value, setValue ] = useState(text)

    const [ counter, setCounter ] = useState(0)

    const { pb } = usePocket()


    const triggerSave = useCallback(() => {
        
        pb.collection(collection).update(id, {
            [field]: value
        })
        .then(() => console.log("OK"))
        .catch((err) => console.log(err))

    }, [value])

    useOutsideAlerter(el, setCounter)

    useEffect(() => {
        if(edit) {
            inputEl.current.click()
        }
    }, [edit])

    useEffect(() => {
        triggerSave()
    }, [counter])


    return (
        <span ref={el} onClick={() => setEdit(true)}>
            <ReactTextareaAutosize placeholder="Add a note about the item/contents here" className={styles.input} ref={inputEl} value={value} onChange={(e) => setValue(e.target.value)} />
            {/* {
                edit ? (
                    <ReactTextareaAutosize placeholder="Add a note about the item/contents here" className={styles.input} ref={inputEl} value={value} onChange={(e) => setValue(e.target.value)} />
                ) : (
                    <span>{value}</span>
                )
            } */}
        </span>
    )
}