'use client'

import styles from "./Preview.module.css"

export function Preview(props) {
    return (
        <img src={URL.createObjectURL(props.file)} className={styles.previewFile} />
    )
}