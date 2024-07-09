'use client'

import { useCallback, useRef } from "react"
import styles from "../forms.module.css"
import { usePocket } from "@/contexts/PocketContext"
import { useRouter } from "next/navigation"

export function ChangeName() {

    const { pb, user } = usePocket()

    const fName = useRef()
    const lName = useRef()

    const router = useRouter()

    const submit = useCallback((e) => {
        e.preventDefault()

        console.log(user.id)

        pb.collection("users").update(user.id, {
            firstName: fName.current.value,
            lastName: lName.current.value
        })
        .then(() => {
            router.push("/")
        })
    }, [user, fName, lName, router])


    return (
        <form onSubmit={submit} className={styles.form}>

            <div className={styles.formRow}>
                <div className={styles.formItem}>
                    <div>
                        <label>First name</label>
                    </div>
                    <input type="text" defaultValue={user?.firstName} ref={fName} />
                </div>

                <div className={styles.formItem}>
                    <div>
                        <label>Last name</label>
                    </div>
                    <input type="text" defaultValue={user?.lastName} ref={lName} />
                </div>
            </div>

            <br />

            <div className={styles.formItem}>
                <button type="submit">Change name</button>
            </div>

        </form>
    )
}