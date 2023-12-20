import styles from "./MultiFileInput.module.css"

export function MultiFileInput() {
    return (
        <div>
            <input type="file" multiple />

            <div className={styles.previews}>

            </div>
        </div>
    )
}