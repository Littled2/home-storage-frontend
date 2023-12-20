'use client'

import { LuSearch } from "react-icons/lu";
import { BsBoxSeam } from "react-icons/bs";
import { MdOutlineAddBox } from "react-icons/md";
import { RxPerson } from "react-icons/rx";

import styles from "./navbar.module.css"
import { NavItem } from "./Item";

export default function Navbar() {
    return (
        <nav className={styles.nav}>

            <NavItem href={"/account"} icon={<RxPerson />} />

            <NavItem href={"/"} icon={<LuSearch />} />

            <NavItem href={"/storage"} icon={<BsBoxSeam />} />

            <NavItem href={"/new"} icon={<MdOutlineAddBox />} />

        </nav>
    )
}