import Link from "next/link";
import { Container } from "./Container";
import styles from "./ContainersView.module.css"

export function ContainersView() {

    const containers = [
        {
            name: "Bedside Table",
        },
        {
            name: "Edward's Left Wardrobe",
        },
    ]

    return (
        <article>

            <div className={styles.top}>
                <h3>Containers</h3>
                <Link href={"/location/___/containers"}>View all</Link>
            </div>

            <div className={styles.containers}>
                {
                    containers.map(c => <Container name={c.name} />)
                }
            </div>

        </article>
    )
}