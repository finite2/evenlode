import Image from "next/image";
import Link from "next/link";
import css from "./navbar.module.css";
import { MyAccountLink, NavButton } from "./nav-button";
import { Login } from "./login";

export const Navbar = () => {
  return (
    <div className={css.header}>
      <div className={css.logorow}>
        <Link href="/" className={css.logo}>
          <Image src="/images/EvenlodeBadmintonLogo.png" alt="Evenlode Badminton Club logo" fill />
        </Link>
        <Login />
      </div>
      <nav className={css.nav}>
        <NavButton href="/">Home</NavButton>
        <NavButton href="/about">About</NavButton>
        <NavButton href="/membership">Membership</NavButton>
        <NavButton href="/juniors">Juniors</NavButton>
        <NavButton href="/contact-us">Contact us</NavButton>
        <MyAccountLink />
      </nav>
      <div className={css.navbottom} />
    </div>
  );
};
