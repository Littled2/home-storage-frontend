'use client'

import { useRef } from "react"
import styles from "../forms.module.css"
import { useRouter } from "next/navigation"
import { usePocket } from "@/contexts/PocketContext"

export function NewLocation() {

    const nameInpt = useRef()
    const router = useRouter()

    const { user, pb } = usePocket()

    async function submit(e) {
        e.preventDefault()

        pb.collection("locations").create({
            name: nameInpt.current.value,
            gid: user.gid
        })
        .then((e) => {
            router.push("/location/" + e.id)
        })
        
    }

    return (
        <form className={styles.form} onSubmit={(e) => submit(e)}>

            <div className={styles.formItem}>
                <label>Name</label>
                <input type="text" required placeholder="Eg. 48 The Road" ref={nameInpt} />
            </div>

            <div className={styles.submitCont}>
                <button type="submit">Create</button>
            </div>
        </form>
    )
}

// $ npm install --save dropzone