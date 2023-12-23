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

            <NavItem href={"/account"} icon={<RxPerson />} label={"Account"} />

            <NavItem href={"/"} icon={<LuSearch />} label={"Search"} />

            <NavItem href={"/storage"} icon={<BsBoxSeam />} label={"Storage"} />

            <NavItem href={"/new"} icon={<MdOutlineAddBox />} label={"New"} />

        </nav>
    ) : (
        <></>
    )
}