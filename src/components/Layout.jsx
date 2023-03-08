import React from "react"
import classes from "./Layout.module.css"
import { Navbar } from "./Navbar"
export const Layout = ({children}) => {
    return (
        <React.Fragment>
            <div className={classes.container}>
                <Navbar />
                {children}
            </div>
        </React.Fragment>
    )
}