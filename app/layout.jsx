import { PocketProvider } from "@/contexts/PocketContext";
import styles from "./layout.module.css"
import Navbar from "@/components/layout/Navbar";
import "./globals.css"

export default function HomeLayout({ children }) {
    return (
        <body>
            <PocketProvider>
                <main className={styles.appWrapper}>

                    <section className={styles.content}>
                        {children}
                    </section>

                    <Navbar />

                </main>
            </PocketProvider>
        </body>
    )
}