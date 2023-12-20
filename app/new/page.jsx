import Link from "next/link";
import styles from "./new.module.css"
import { FaArrowRight } from "react-icons/fa6";

export default function NewPage() {
    return (
        <section className={styles.page}>

            <h2 className="page-heading">Add something.</h2>

            <div className={styles.btns}>

                <Link href={"/new/item"}>
                    <span>Item</span>
                    <FaArrowRight />
                </Link>

                <Link href={"/new/container"}>
                    <span>Container</span>
                    <FaArrowRight />
                </Link>

                <Link href={"/new/location"}>
                    <span>Location</span>
                    <FaArrowRight />
                </Link>


            </div>

        </section>
    )
}