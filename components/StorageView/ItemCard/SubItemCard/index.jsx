'use client'

import { usePocket } from "@/contexts/PocketContext"
import styles from "./styles.module.css"
import Link from "next/link"
import { BsFileArrowUp } from "react-icons/bs"
import { useCallback } from "react"

export function SubItemCard({ item, setRefreshCounter }) {

    const { pb } = usePocket()

    const removeParent = useCallback(() => {
        pb.collection("items").update(item.id, {
            parent: ""
        })
        .then(() => setRefreshCounter(c => c + 1))
    }, [pb])

    return (
        <Link href={"/storage/item/" + item?.id} className={styles.card}>
            <div className={styles.inner}>
                <img className={styles.image} style={{ filter: "saturate(50%)", opacity: "0.95" }} src={pb.files.getUrl(item, item.image, { thumb: '250x250' })} />
                <p className={styles.name}>{item?.name}</p>
            </div>

            <button onClick={e => {
                e.stopPropagation()
                e.preventDefault()
                removeParent()
            }}>
                <BsFileArrowUp />
            </button>
        </Link>
    )
}