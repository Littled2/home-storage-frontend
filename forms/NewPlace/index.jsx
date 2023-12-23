'use client'

import { useEffect, useRef, useState } from "react"
import styles from "../forms.module.css"
import { useRouter } from "next/navigation"
import { usePocket } from "@/contexts/PocketContext"

export function NewPlace() {

    const nameInpt = useRef()
    const locSelect = useRef()

    const router = useRouter()

    const { pb, user } = usePocket()

    const [ locations, setLocations ] = useState([])

    useEffect(() => {
        pb.collection("locations").getFullList({
            filter: `gid = '${user.gid}'`
        })
        .then(locs => setLocations(locs))
    }, [])

    async function submit(e) {
        e.preventDefault()

        pb.collection("places").create({
            name: nameInpt.current.value,
            gid: user.gid,
            location: user.activeLocation
        })
        .then((p) => {
            router.push("/place/" + p.id)
        })

        
    }

    return (
        <form className={styles.form}>

            <div className={styles.formItem}>
                <label>Name</label>
                <input type="text" required placeholder="Eg. 48 The Road" ref={nameInpt} />
            </div>

            <div className={styles.submitCont}>
                <button type="submit" onClick={submit}>Create</button>
            </div>
        </form>
    )
}