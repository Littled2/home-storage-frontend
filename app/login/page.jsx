import { Login } from "@/forms/Login"
import styles from "./page.module.css"

export default function LoginPage() {
    return (
        <section className={styles.page}>

            <div className={styles.main}>
                <h1>Login</h1>
                
                <br />

                <Login />
            </div>
            
            <p class="login-lbl">Need an account? <a href="/create-account">Create one.</a></p>

        </section>
    )
}