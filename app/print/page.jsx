'use client'

import { usePocket } from "@/contexts/PocketContext"
import styles from "./styles.module.css"
import { useEffect, useState } from "react"
import QRCode from "react-qr-code"
import { BsPrinter } from "react-icons/bs"
import { PrintPreview } from "@/components/PrintPreview"
import { PrintToolbar } from "./PrintToolbar"
import { useRef } from "react"
import { useSearchParams } from "next/navigation"

export default function PrintLabels() {

    const [ items, setItems ] = useState([])
    const params = useSearchParams()

    const [ selectedLocation, setSelectedLocation ] = useState(params.has("locationID") ? params.get("locationID") : null)

    const prevRef = useRef()

    const { pb } = usePocket()

    useEffect(() => {

        let filter = ""

        if(selectedLocation && selectedLocation !== "all-locations") {
            filter = `location = "${selectedLocation}"`
        }

        if(params.has("itemID")) {
            filter = `id = "${params.get("itemID")}"`
        }
        
        if(params.has("items")) {
            let list = JSON.parse(params.get("items"))
            filter = list.map(id => ` id = "${id}" `).join("||")
        }

        pb.collection("items").getFullList({
            sort: "name",
            filter: filter
        })
        .then(setItems)

    }, [selectedLocation])

    return (
        <div className={styles.wrapper}>

            <PrintToolbar previewRef={prevRef} selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />

            {/* <button onClick={window.print} className={styles.printButton}>
                <BsPrinter />
                <span>Print all</span>
            </button> */}

            <PrintPreview previewRef={prevRef} items={items} setItems={setItems} />

            {/* <section className={styles.labels}>
                {
                    items.map((item, i) => {
                        return (
                            <div className={styles.sticker}>
                                <QRCode style={{ height: "6rem", width: "6rem" }} value={item.id} />
                                <div className={styles.inner}>
                                    <div>
                                        <h4>{item?.name}</h4>
                                        <p className={styles.id}>ID: {item?.id}</p>
                                    </div>
                                    <div>
                                                                       </div>
                                </div>
                            </div>
                        )
                    })
                }
            </section> */}
        </div>
    )
}