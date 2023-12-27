'use client'

import { usePocket } from "@/contexts/PocketContext";
import Link from "next/link";

import styles from "./accountBtn.module.css"
import { BsPerson } from "react-icons/bs";

export function AccountBtn() {

    const { user } = usePocket()

    return (
        <Link href={"/account"} className={styles.btn}>
            <BsPerson />
        </Link>
    )
}