'use client'

import styles from "./TextInput.module.css"

export function TextInput({ type="text", value, setValue }) {
    return (
        <input
            // className={styles.input}
            type={type}
            value={value}
            onChange={e => setValue(e.target.value)}
        />
    )
}