'use client'

import { QrScanner } from "@yudiel/react-qr-scanner";
import styles from "./page.module.css"
import { useRouter } from "next/navigation";



export default function ScanPage() {

    const router = useRouter()

    return (
        <section className={styles.page}>
            
            <h1>Scan a container's QR code</h1>

            <p>Point me at a QR code!</p>

            <div className={styles.scanner}>
                <QrScanner
                    onDecode={(res) => router.push(`/storage/container/${res}`)}
                    onError={(error) => console.log(error?.message)}
                    scanDelay={300}
                    videoId="video"
                />

                <video id="video"></video>
            </div>            

        </section>
    )
}