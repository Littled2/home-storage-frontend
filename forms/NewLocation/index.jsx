'use client'

import { useRef } from "react"
import styles from "../forms.module.css"
import { useRouter } from "next/navigation"
import { usePocket } from "@/contexts/PocketContext"

export function NewLocation() {

    const nameInpt = useRef()
    const router = useRouter()

    const { user, pb } = usePocket()

    async function submit() {

        pb.collection("locations").create({
            name: nameInpt.current.value,
            gid: user.gid
        })
        .then((e) => {
            router.push("/storage/location/" + e.id)
        })
        
    }

    return (
        <div className={styles.form}>

            <div className={styles.formItem}>
                <label>Name</label>
                <input type="text" required placeholder="Eg. 48 The Road" ref={nameInpt} />
            </div>

            <div className={styles.submitCont}>
                <button type="submit" onClick={submit}>Create</button>
            </div>
        </div>
    )
}

// $ npm install --save dropzone