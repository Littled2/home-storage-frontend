'use client'

import { useEffect, useRef, useState } from "react"
import styles from "../forms.module.css"
import { usePocket } from "@/contexts/PocketContext"
import { LocationSelect } from "@/components/LocationSelect"
import { useRouter } from "next/navigation"
import { FileInput } from "@/components/FileInput"
import { BsChevronRight } from "react-icons/bs"
import { SubLocationSelect } from "@/components/SubLocationSelect"

export function NewItem() {

    const nameRef = useRef()
    const descRef = useRef()

    const [ files, setFiles ] = useState([])

    const router = useRouter()
    const { pb, user } = usePocket()

    const [ location, setLocation ] = useState()
    const [ subLocation, setSubLocation ] = useState()



    function submit() {

        const data = new FormData()

        data.append("name", nameRef.current.value)
        data.append("description", descRef.current.value)

        data.append("user", user.id)

        data.append("location", location)

        if(files.length > 0) {
            data.append("image", files[0])
        }

        pb.collection("items").create(data)
        .then(c => {
            router.push("/")
        })
        .catch(e => console.error("Error creating item", e))
    }

    return (
        <div className={styles.form}>

            <div className={styles.form}>

                <br />

                <div className={styles.formItem}>
                    <label>Where is it?</label>
                    <div className={styles.formRow}>
                        <div className={styles.formItem}>
                            <LocationSelect selectedLocationID={location} setSelectedLocationID={setLocation} />
                        </div>

                        <BsChevronRight />

                        <div className={styles.formItem}>
                            <SubLocationSelect selectedSubLocationID={subLocation} setSelectedSubLocationID={setSubLocation} locationID={location} />
                        </div>
                    </div>
                </div>

                <br />
    
                <div className={styles.formItem}>
                    <label>Name</label>
                    <input type="text" ref={nameRef} required />
                </div>
    
                <div className={styles.formItem}>
                    <label>Description <small>(Optional)</small></label>
                    <textarea ref={descRef}></textarea>
                </div>

                <div className={styles.formItem}>
                    <label>Image</label>
                    <FileInput setValue={setFiles} />
                </div>
    
                <div className={styles.submitCont}>
                    <button type="submit" onClick={submit}>Create</button>
                </div>
            </div>

        </div>
    )
}
