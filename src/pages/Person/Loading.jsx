import React from 'react'
import styles from './loading.module.css'
export const Loading = () => {
    return (
        <>
        <h2 className={styles.heading} >
            Loading
        </h2>
            <div className={styles.ldsRipple}>
                <div></div>
                <div></div>
            </div>
        </>
    )
}
