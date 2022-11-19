"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "../styles/navbar.module.css";
import { classes } from "./utils";

export const NavButton = ({ href, children }) => {
  const pathname = usePathname();

  const isSelected = (pathname.startsWith(href) && href.length > 2) || pathname === href;

  return (
    <Link href={href} className={classes(css.navbutton, isSelected ? css.selected : undefined)}>
      {children}
    </Link>
  );
};
