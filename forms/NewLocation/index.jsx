'use client'

import { useRef } from "react"
import styles from "../forms.module.css"
import { useRouter } from "next/navigation"
import { usePocket } from "@/contexts/PocketContext"

export function NewLocation() {

    const nameInpt = useRef()
    const router = useRouter()

    const { user } = usePocket()

    async function submit(e) {
        e.preventDefault()

        pb.collection("location").create({
            name: nameInpt.current.value,
            uid: user.id
        })
        .then(() => {
            router.push("/storage")
        })
        
    }

    return (
        <form className={styles.form} onSubmit={submit}>

            <div className={styles.formItem}>
                <label>Name</label>
                <input type="text" placeholder="Eg. 48 The Road" ref={nameInpt} />
            </div>

            <div className={styles.submitCont}>
                <button type="submit">Create</button>
            </div>
        </form>
    )
}

// $ npm install --save dropzone