'use client'

import { useState } from "react"
import styles from "../forms.module.css"
import { usePocket } from "@/contexts/PocketContext"
import { useRouter } from "next/navigation"
import { TextInput } from "@/components/TextInput"


export function CreateAccount() {

    const [ fName, setFName ] = useState('')
    const [ lName, setLName ] = useState('')

    const [ eml, setEml ] = useState('')
    const [ pswd, setPswd ] = useState('')
    const [ pswdAgn, setPswdAgn ] = useState('')

    const [error, setError] = useState(null)

    const { register } = usePocket()

    const router = useRouter()

    function submit(e) {
        e.preventDefault()


        register(eml, pswd, fName, lName)
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

            <div className={styles.formRow}>

                <div className={styles.formItem}>
                    <label>First Name</label>
                    <TextInput value={fName} setValue={setFName} />
                </div>

                <div className={styles.formItem}>
                    <label>Last Name</label>
                    <TextInput value={lName} setValue={setLName} />
                </div>

            </div>

            <br />


            <div className={styles.formItem}>
                <label>Email</label>
                <TextInput value={eml} setValue={setEml} />
            </div>

            <br />

            <div className={styles.formItem}>
                <label>Password</label>
                <TextInput type={"password"} value={pswd} setValue={setPswd} />
            </div>

            <div className={styles.formItem}>
                <label>Retype password</label>
                <TextInput type={"password"} value={pswdAgn} setValue={setPswdAgn} />
            </div>

            {
                error ? (
                    <p style={{color:"red"}}>Something went wrong</p>
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