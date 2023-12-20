import { Card } from "./Card"
import styles from "./results.module.css"

export function Results() {
    return (
        <section className={styles.cards}>

            <Card />

            <Card />

            <Card />

        </section>
    )
}