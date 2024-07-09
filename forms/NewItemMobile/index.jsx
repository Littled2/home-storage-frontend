'use client'

import { LocationSelect } from "@/components/LocationSelect"
import styles from "../forms.module.css"
import { usePocket } from "@/contexts/PocketContext"
import { useRouter } from "next/navigation"
import { BsChevronRight } from "react-icons/bs"
import { SubLocationSelect } from "@/components/SubLocationSelect"
import { useState } from "react"

export function NewItemMobile({ image }) {

    const router = useRouter()
    const { pb, user } = usePocket()
    
    const [ location, setLocation ] = useState()
    const [ subLocation, setSubLocation ] = useState()
    const [ name, setName ] = useState('')


    function submit(e) {

        e.preventDefault()

        const data = new FormData()

        data.append("name", name)
        data.append("description", "")

        data.append("user", user.id)

        data.append("location", location)

        data.append("image", image)

        pb.collection("items").create(data)
        .then(() => {
            router.replace("/")
        })
        .catch(e => console.error("Error creating item", e))
    }

    return (
        <form onSubmit={submit} className={styles.form}>

            <div className={styles.formItem}>
                <div>
                    <label>Item name</label>
                </div>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required />
            </div>

            <br />

            <div className={styles.formItem}>

                <label>Where is it?</label>
                {/* <div className={styles.formRow}> */}
                    <div className={styles.formItem}>
                        <LocationSelect selectedLocationID={location} setSelectedLocationID={setLocation} />
                    </div>


                    <div className={styles.formItem}>
                        <SubLocationSelect selectedSubLocationID={subLocation} setSelectedSubLocationID={setSubLocation} locationID={location} />
                    </div>
                {/* </div> */}
            </div>

            <br />

            <button type="submit">
                Add item
            </button>

        </form>
    )
}