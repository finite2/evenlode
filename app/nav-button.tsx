"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./navbar.module.css";
import { classes } from "../components/utils";
import { useSession } from "next-auth/react";

export const NavButton = ({ href, children }) => {
  const pathname = usePathname();

  const isSelected = (pathname.startsWith(href) && href.length > 2) || pathname === href;

  return (
    <Link href={href} className={classes(css.navbutton, isSelected ? css.selected : undefined)}>
      {children}
    </Link>
  );
};

export const MyAccountLink = () => {
  const { data: user } = useSession();

  if (user) {

    return <NavButton href="/users/me">My account</NavButton>;
  }
  return null;
};
