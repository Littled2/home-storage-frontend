'use client'

import { CreateAccount } from "@/forms/CreateAccount/page"
import styles from "./page.module.css"


export default function CreateAccountPage() {
    return (
        <section className={styles.page}>

            <div className={styles.main}>
                <h1>Create Account</h1>
                
                <br />

                <CreateAccount />
            </div>
            
        </section>
    )
}