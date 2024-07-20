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

            <h1 className={styles.heading}>Your Account.</h1>

            <p>{user?.email}</p>

            <br />

            <div className={styles.options}>

                <Link href={"/account/change-name"}>
                    <span>Change Name</span>
                    <div className={styles.icon}>
                        <FaArrowRight />
                    </div>
                </Link>

                <Link href={"/account/change-password"}>
                    <span>Change Password</span>
                    <div className={styles.icon}>
                        <FaArrowRight />
                    </div>
                </Link>


            </div>

        </section>
    )
}