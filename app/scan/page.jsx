'use client'

import { QrScanner } from "@yudiel/react-qr-scanner";
import styles from "./page.module.css"
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function ScanPage() {

    const router = useRouter()

    const [ err, setErr ] = useState(false)

    return (
        <section className={styles.page}>
            
            <h1>Scan a container's QR code</h1>

            {/* <p>Point me at a QR code!</p> */}

            <div className={styles.scanner}>
                <QrScanner
                    onDecode={(res) => {
                        router.push(`/storage/item/${res}`)
                    }}

                    containerStyle={{ height: "calc(100vh - var(--mobile-navbar-height))", position: "fixed", top:"0", left:"0", width:"100vw", paddingTop: "0 !important" }}
                    
                    // videoStyle={{ height: "calc(100vh - var(--mobile-navbar-height)) !important" }}

                    viewFinderBorder={1}

                    onError={(error) => console.log(error?.message)}
                    scanDelay={300}
                    videoId="video"
                />

                <video id="video"></video>
            </div>

            {
                err ? (
                    <p style={{ color: "red" }}>Invalid QR code!</p>
                ) : (
                    <></>
                )
            }          

        </section>
    )
}