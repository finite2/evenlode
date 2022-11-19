import Image from "next/image";
import css from "../styles/navbar.module.css";
import { NavButton } from "./nav-button";

export const Navbar = () => {
  return (
    <>
      <div className={css.logorow}>
        <div className={css.logo}>
          <Image
            src="/images/EvenlodeBadmintonLogo.png"
            alt="Evenlode Badminton Club logo"
            fill
            objectFit="contain"
          />
        </div>
        <div>Login</div>
      </div>
      <nav className={css.nav}>
        <NavButton href="/">Home</NavButton>
        <NavButton href="/about">About</NavButton>
        <NavButton href="/membership">Membership</NavButton>
        <NavButton href="/juniors">Juniors</NavButton>
        <NavButton href="/contact-us">Contact us</NavButton>
      </nav>

      <div className={css.navbottom} />
    </>
  );
};
