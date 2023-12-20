import styles from "./card.module.css"
import {faker} from "@faker-js/faker"

export function Card() {
    return (
        <div className={styles.card}>
            
            <img className={styles.imgs} src={faker.image.urlLoremFlickr()} />

            <h5 className={styles.name}>{faker.company.name()}</h5>

            <p className={styles.desc}>this is </p>

        </div>
    )
}