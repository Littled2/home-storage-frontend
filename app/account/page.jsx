'use client'

import { FaArrowRight } from "react-icons/fa6"
import styles from "./account.module.css"
import Link from "next/link"
import { LuLogOut } from "react-icons/lu"
import { usePocket } from "@/contexts/PocketContext"
import { useEffect, useState } from "react"
import { SelectActiveLocation } from "@/components/SelectActiveLocation"
import { BsHouse, BsPerson } from "react-icons/bs"

export default function AccountPage() {

    const { user, logout, pb } = usePocket()

    const [ group, setGroup ] = useState(null)
    
    const [ itemsCount, setItemsCount ] = useState(0)
    const [ containersCount, setContainersCount ] = useState(0)

    return (
        <section className={styles.page}>

            <h1>Your Account.</h1>
            <h3>Logged in as {user?.firstName}</h3>

            <br />

            <div className={styles.btns}>

                <Link href={"/account/change-name"}>
                    <span>Change Name</span>
                    <FaArrowRight />
                </Link>

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