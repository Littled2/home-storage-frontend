'use client'

import { LuSearch } from "react-icons/lu";
import { BsBoxSeam } from "react-icons/bs";
import { MdOutlineAddBox } from "react-icons/md";
import { RxPerson } from "react-icons/rx";

import styles from "./navbar.module.css"
import { NavItem } from "./Item";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {

    const [ render, setRender ] = useState(true)

    const pathname = usePathname()

    useEffect(() => {
        if(pathname === "/login") {
            setRender(false)
        } else {
            setRender(true)
        }
    }, [pathname])

    
    return render ? (
        <nav className={styles.nav}>

            <NavItem href={"/account"} icon={<RxPerson />} />

            <NavItem href={"/"} icon={<LuSearch />} />

            <NavItem href={"/storage"} icon={<BsBoxSeam />} />

            <NavItem href={"/new"} icon={<MdOutlineAddBox />} />

        </nav>
    ) : (
        <></>
    )
}