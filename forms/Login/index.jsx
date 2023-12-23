'use client'

import { usePocket } from "@/contexts/PocketContext"
import styles from "../forms.module.css"
import { useRef, useState } from "react"
import { useRouter } from "next/navigation"

export function Login() {

    const emailInput = useRef()
    const passwordInput = useRef()

    const [error, setError] = useState(null)

    const { login } = usePocket()

    const router = useRouter()

    function submit(e) {
        e.preventDefault()

        console.log(emailInput.current.value, passwordInput.current.value)

        login(emailInput.current.value, passwordInput.current.value)
        .then(e => {
            console.log(e)
            router.push("/")
        })
        .catch(err => {
            setError(true)
        })

    }

    return (
        <form className={styles.form} onSubmit={submit}>

            <div className={styles.formItem}>
                <label>Email</label>
                <input type="text" ref={emailInput} />
            </div>

            <div className={styles.formItem}>
                <label>Password</label>
                <input type="password" ref={passwordInput} />
            </div>

            {
                error ? (
                    <p style={{color:"red"}}>Incorrect username or password</p>
                ) : (
                    <></>
                )
            }

            <div className={styles.submitCont}>
                <button type="submit">Log In</button>
            </div>

        </form>
    )
}
