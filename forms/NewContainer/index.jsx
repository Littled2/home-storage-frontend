'use client'

import styles from "../forms.module.css"

export function NewContainer() {
    return (
        <form className={styles.form}>

            <div className={styles.formItem}>
                <label>Name</label>
                <input type="text" />
            </div>

            <div className={styles.formItem}>
                <label>Description</label>
                <textarea></textarea>
            </div>

            <div className={styles.formItem}>
                <label>Image(s)</label>
                <input type="file" multiple="true" />
            </div>

            <div className={styles.submitCont}>
                <button type="submit">Create</button>
            </div>

        </form>
    )
}
