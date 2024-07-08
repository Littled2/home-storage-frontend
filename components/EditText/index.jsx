'use client'

import { useOutsideAlerter } from "@/hooks/useOutsideAlerter"
import { useCallback, useEffect, useRef, useState } from "react"

import styles from "./edit.module.css"
import { usePocket } from "@/contexts/PocketContext"

export function EditText({ text, collection, id, field }) {

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

    // useOutsideAlerter(el, () => setCounter(c => c + 1))

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
            <input className={styles.input} style={{ width: value.length + 0.5 + "ch" }} type="text" onBlur={triggerSave} ref={inputEl} value={value} onChange={(e) => setValue(e.target.value)} />
            {/* {
                edit ? (
                    <input className={styles.input} style={{ width: value.length + "ch" }} type="text" onBlur={triggerSave} ref={inputEl} value={value} onChange={(e) => setValue(e.target.value)} />
                ) : (
                    <span className={styles.text}>{value}</span>
                )
            } */}
        </span>
    )
}