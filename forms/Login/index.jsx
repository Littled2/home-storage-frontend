'use client'

import { usePocket } from "@/contexts/PocketContext"
import styles from "../forms.module.css"
import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { TextInput } from "@/components/TextInput"

export function Login() {

    const [ eml, setEml ] = useState('')
    const [ pswd, setPswd ] = useState('')

    const [error, setError] = useState(null)

    const { login } = usePocket()

    const router = useRouter()

    function submit(e) {
        e.preventDefault()

        login(eml, pswd)
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
                <TextInput type="email" value={eml} setValue={setEml} />
            </div>

            <div className={styles.formItem}>
                <label>Password</label>
                <TextInput type="password" value={pswd} setValue={setPswd} />
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
