'use client'

import { FaArrowRight } from "react-icons/fa6"
import styles from "./account.module.css"
import Link from "next/link"
import { LuLogOut } from "react-icons/lu"
import { usePocket } from "@/contexts/PocketContext"
import { useEffect, useState } from "react"

export default function AccountPage() {

    const { user, logout, pb } = usePocket()

    const [ group, setGroup ] = useState(null)

    useEffect(() => {
        pb.collection("groups").getOne(user.gid)
        .then(doc => setGroup(doc))
    })

    return (
        <section className={styles.page}>

            <h2>Your Account.</h2>
            <p>Logged in as: <span>{JSON.stringify(user)}</span></p>
            {/* <p>Group: <span>{group.name}</span></p> */}

            <div className={styles.btns}>

                <Link href={"/account/change-password"}>
                    <span>Change Password</span>
                    <FaArrowRight />
                </Link>

                <button href={"/account/change-password"} onClick={logout}>
                    <span>Log Out</span>
                    <LuLogOut />
                </button>

            </div>

        </section>
    )
}