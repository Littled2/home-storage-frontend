import Link from "next/link";
import styles from "./new.module.css"

export default function NewPage() {
    return (
        <section>

            <h2>Add something.</h2>

            <div className={styles.btns}>

                <Link href={"/new/item"}>Item</Link>

                <Link href={"/new/container"}>Container</Link>

                <Link href={"/new/location"}>Location</Link>


            </div>

        </section>
    )
}