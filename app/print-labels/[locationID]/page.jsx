'use client'

import { usePocket } from "@/contexts/PocketContext"
import { useEffect, useState } from "react"
import styles from "./styles.module.css"
import QRCode from "react-qr-code"


export default function PrintLabels({ params }) {

    const { user, pb } = usePocket()

    const [ containers, setContainers ] = useState([])
    

    useEffect(() => {

        if(!user) return

        pb.collection("containers").getFullList({
            filter: `gid = '${user.gid}' && place.location = '${params.locationID}'`,
            expand: "place"
        })
        .then(c => {
            console.log(c)
            setContainers(c)
        })

    }, [])

    return (
        <section className={styles.wrapper}>
            {
                containers.map((c, i) => {
                    return (
                        <div className={styles.container} key={i}>

                            <QRCode style={{ height: "6rem", width: "6rem" }} value={"container_" + c.id} />
                        
                            <div className={styles.inner}>
                                <h3>{c.name}</h3>
                            </div>
                        </div>
                    )
                })
            }
        </section>
    )
}