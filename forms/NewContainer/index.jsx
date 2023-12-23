'use client'

import { useEffect, useRef, useState } from "react"
import styles from "../forms.module.css"
import { usePocket } from "@/contexts/PocketContext"
import { LocationSelect } from "@/components/LocationSelect"
import { useRouter } from "next/navigation"

export function NewContainer() {

    const nameRef = useRef()
    const descRef = useRef()
    const imgRef = useRef()
    const placeSelectRef = useRef()

    const router = useRouter()
    const { pb, user } = usePocket()



    const [ places, setPlaces ] = useState([])

    useEffect(() => {

        if(!user) return

        console.log(`gid = '${user.gid}' && location = '${user.activeLocation}'`)

        pb.collection("places").getFullList({
            filter: `gid = '${user.gid}' && location = '${user.activeLocation}'`
        })
        .then(p => setPlaces(p))

    }, [user])



    function submit() {

        const data = new FormData()

        data.append("name", nameRef.current.value)
        data.append("description", descRef.current.value)


        data.append("gid", user.gid)
        data.append("place", placeSelectRef.current.value)

        console.log(data)
        data.forEach((v,k) => console.log(v, k))

        pb.collection("containers").create(data)
        .then(c => {
            router.push("/storage/container/" + c.id)
        })
        .catch(e => console.error(e))
    }

    return (
        <div className={styles.form}>

            <div className={styles.form}>

                <br />

                <div className={styles.formItem}>
                    <label>Where is the container?</label>
                    <select ref={placeSelectRef}>
                        {
                            places.map(p => {
                                return (
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <br />

                <br />
    
                <div className={styles.formItem}>
                    <label>Container Name</label>
                    <input type="text" ref={nameRef} />
                </div>
    
                <div className={styles.formItem}>
                    <label>Description <small>(Optional)</small></label>
                    <textarea ref={descRef}></textarea>
                </div>
    
                <div className={styles.submitCont}>
                    <button type="submit" onClick={submit}>Create</button>
                </div>
            </div>

        </div>
    )
}
