'use client'

import { LuSettings } from "react-icons/lu"
import styles from "./styles.module.css"
import { useState } from "react"
import { PrintSettingsForm } from "@/forms/PrintSettingsForm"
import { useEffect } from "react"
import { usePocket } from "@/contexts/PocketContext"
import { BsPrinter } from "react-icons/bs"
import { useCallback } from "react"
import { useSearchParams } from "next/navigation"

export function PrintToolbar({ previewRef, selectedLocation, setSelectedLocation }) {

    const { pb, user } = usePocket()

    const [ settingsOpen, setSettingsOpen ] = useState(false)
    const [ locations, setLocations ] = useState([])

    const params = useSearchParams()

    
    useEffect(() => {
        pb.collection("locations").getFullList({
            sort: "-name"
        })
        .then(setLocations)
        .catch(err => {
            console.error("Error getting locations in the toolbar", err)
        })

    }, [])

    const print = () => {
        const iframe = document.createElement("iframe")
        // iframe.style.display = "none"
        document.body.appendChild(iframe)
        iframe.contentDocument.write("<p>Hello</p>")
        iframe.contentWindow.focus()
        setTimeout(() => iframe.contentWindow.print(), 500)
        
    }

    return (
        <div className={styles.wrapper}>

            <section className={styles.toolbar}>
                <div className={[ styles.settings, settingsOpen ? styles.open : "" ].join(" ")} onClick={() => setSettingsOpen(open => !open)}>
                    <LuSettings />
                    <span>Paper settings</span>
                </div>

                {
                    !params.has("itemID") && (
                        <select className={styles.select} onInput={e => setSelectedLocation(e.target.value)}>
                            <option selected={selectedLocation === "all-locations"} value="all-locations">Print all items</option>
                            {
                                locations.map(loc => <option selected={selectedLocation === loc.id} key={loc.id} value={loc.id}>{loc.name}</option>)
                            }
                        </select>
                    )
                }

                <button className={styles.printBtn} onClick={print}>
                    <BsPrinter />
                    <span>Print</span>
                </button>

            </section>

            {
                settingsOpen && (
                    <section className={styles.settingsWrapper}>
                        <PrintSettingsForm />
                    </section>
                )
            }

        </div>
    )
}
