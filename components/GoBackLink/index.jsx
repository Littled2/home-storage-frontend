import styles from "./goback.module.css"
import { IoIosArrowRoundBack } from "react-icons/io";
import Link from "next/link";

export function GoBackLink({ href }) {
    return (
        <Link href={href} className={styles.link}>
            <IoIosArrowRoundBack />
            <span>Back</span>
        </Link>
    )
}