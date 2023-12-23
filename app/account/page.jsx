'use client'

import { FaArrowRight } from "react-icons/fa6"
import styles from "./account.module.css"
import Link from "next/link"
import { LuLogOut } from "react-icons/lu"
import { usePocket } from "@/contexts/PocketContext"
import { useEffect, useState } from "react"
import { SelectActiveLocation } from "@/components/SelectActiveLocation"
import { BsHouse } from "react-icons/bs"

export default function AccountPage() {

    const { user, logout, pb } = usePocket()

    const [ group, setGroup ] = useState(null)

    useEffect(() => {
        pb.collection("groups").getOne(user.gid)
        .then(doc => setGroup(doc))
    })

    return (
        <section className={styles.page}>

            <h1>Hi there, {user?.name}</h1>

            <div>

                <h3>Your Locations</h3>

                <br />

                <SelectActiveLocation />

            </div>


            <br />
            
            <br />

            <h3>Your Account.</h3>
            <p><span>{user?.email}</span></p>

            <br />


            <br />

            <div className={styles.btns}>

                <Link href={"/account/change-password"}>
                    <span>Change Password</span>
                    <FaArrowRight />
                </Link>

                <Link href={"/new/location"}>
                    <span>Add new location</span>
                    <BsHouse />
                </Link>

                <button href={"/account/change-password"} onClick={logout}>
                    <span>Log Out</span>
                    <LuLogOut />
                </button>

            </div>

        </section>
    )
}