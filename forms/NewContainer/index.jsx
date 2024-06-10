'use client'

import { useEffect, useRef, useState } from "react"
import styles from "../forms.module.css"
import { usePocket } from "@/contexts/PocketContext"
import { LocationSelect } from "@/components/LocationSelect"
import { useRouter } from "next/navigation"

export function NewContainer({ place }) {

    const nameRef = useRef()
    const descRef = useRef()
    const imgRef = useRef()
    const placeSelectRef = useRef()

    const router = useRouter()
    const { pb, user } = usePocket()



    const [ places, setPlaces ] = useState([])

    useEffect(() => {

        if(!user) return

        if(place) return

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
        data.append("place", place ? place : placeSelectRef.current.value)

        if(imgRef.current.files.length > 0) {
            data.append("image", imgRef.current.files[0])
        }

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

                {
                    !place ? (
                        <>
                            <div className={styles.formItem}>
                                <label>Where is the container?</label>
                                <select required ref={placeSelectRef}>
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

                        </>
                    ) : (
                        <></>
                    )
                }

                <br />
    
                <div className={styles.formItem}>
                    <label>Container Name</label>
                    <input type="text" ref={nameRef} required />
                </div>
    
                <div className={styles.formItem}>
                    <label>Description <small>(Optional)</small></label>
                    <textarea ref={descRef}></textarea>
                </div>

                <div className={styles.formItem}>
                    <label>Image</label>
                    <input type="file" ref={imgRef} />
                </div>
    
                <div className={styles.submitCont}>
                    <button type="submit" onClick={submit}>Create</button>
                </div>
            </div>

        </div>
    )
}
