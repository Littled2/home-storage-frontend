import { FaArrowRight } from "react-icons/fa6"
import styles from "./account.module.css"
import Link from "next/link"
import { LuLogOut } from "react-icons/lu"

export default function AccountPage() {
    return (
        <section className={styles.page}>

            <h2>Your Account.</h2>
            <p>Logged in as: <span>Edward Blewitt</span></p>

            <div className={styles.btns}>

                <Link href={"/account/change-password"}>
                    <span>Change Password</span>
                    <FaArrowRight />
                </Link>

                <Link href={"/account/change-password"}>
                    <span>Log Out</span>
                    <LuLogOut />
                </Link>

            </div>

        </section>
    )
}