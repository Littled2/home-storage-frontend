import QRCode from "react-qr-code"
import styles from "./sticker.module.css"


export default async function StickerPage({ params, searchParams }) {

    console.log(searchParams)

    return (
        <section>

            <link rel="stylesheet" media="print" href="/print.css" />

            <div className={styles.QRwrapper}>
                <QRCode value={params.containerID} />
                <p className={styles.name}>{searchParams?.name}</p>
            </div>

        </section>
    )
}