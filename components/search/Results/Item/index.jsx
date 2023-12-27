import { BsBox } from "react-icons/bs"
import styles from "./item.module.css"
import Link from "next/link"
import { usePocket } from "@/contexts/PocketContext"

export function ItemResult({ item, name, containerID, containerName, image }) {

    const { pb } = usePocket()

    return (
        <Link href={"/storage/container/" + containerID} className={styles.item}>
            <div className={styles.inner}>
                {
                    image ? (
                        <img src={pb.files.getUrl(item, image, { thumb: '120x120' })} />
                    ) : (
                        <img src={'https://www.svgrepo.com/show/508699/landscape-placeholder.svg'} style={{opacity:"0.2"}} />
                    )
                }
                <p>{name}</p>
            </div>
            <p className={styles.container}>
                <BsBox />
                <span>{containerName}</span>
            </p>
        </Link>
    )
}