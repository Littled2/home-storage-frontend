import { Login } from "@/forms/Login"
import styles from "./page.module.css"

export default function LoginPage() {
    return (
        <section className={styles.page}>

            <h1>Login</h1>
            
            <br />

            <Login />

        </section>
    )
}