'use client'

import styles from "../forms.module.css"
import Camera from 'react-html5-camera-photo';
import '../../node_modules/react-html5-camera-photo/build/css/index.css';

export function NewContainer() {
    return (
        <form className={styles.form}>

            <div className={styles.formItem}>
                <label>Name</label>
                <input type="text" />
            </div>

            <div className={styles.formItem}>
                <label>Description</label>
                <textarea></textarea>
            </div>

            <div>
                <Camera
                    onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
                />
            </div>

        </form>
    )
}

// $ npm install --save dropzone