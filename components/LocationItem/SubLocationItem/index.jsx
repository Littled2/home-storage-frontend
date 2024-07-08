'use client'

import { BsPlus, BsTrash } from "react-icons/bs"
import { EditText } from "../../EditText"
import styles from "./styles.module.css"
import { usePocket } from "@/contexts/PocketContext"

export function SubLocationItem({ subLocation, sc }) {

    const { pb } = usePocket()

    return (
        <li className={styles.subLocation}>
            <p>
                <EditText collection={"sub_locations"} text={subLocation?.name} id={subLocation?.id} field={"name"} />
            </p>

            <button className={styles.btn} onClick={() => {
                pb.collection("sub_locations").delete(subLocation.id)
                .then(() => {
                    sc(c => c + 1)
                })
            }}>
                <BsTrash />
            </button>
        </li>
    )
}