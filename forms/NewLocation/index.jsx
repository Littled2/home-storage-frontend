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
            user: user.id
        })
        .then((e) => {
            router.push("/locations")
        })
        .catch(e => console.error("Error creating locations", e))

    }

    return (
        <form className={styles.form} onSubmit={submit}>

            <div className={styles.formItem}>
                <label>Name</label>
                <input type="text" required placeholder="Eg. Garage" ref={nameInpt} />
            </div>

            <div className={styles.submitCont}>
                <button type="submit">Create</button>
            </div>
        </form>
    )
}