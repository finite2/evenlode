"use client";

import css from "./login.module.css";

import { useSession, signIn, signOut } from "next-auth/react";

const onSignIn = () => signIn();
const onSignOut = () => signOut();

export const Login = () => {
  const { data: session } = useSession();

  if (session) {
    return <LoggedInMenu />;
  }

  return <LoginButton />;
};

export const LoginButton = () => {
  return (
    <button className={css.login} onClick={onSignIn}>
      Login
    </button>
  );
};

const LoggedInMenu = () => {
  const { data: session } = useSession();

  return (
    <div className={css.loggedin}>
      Hello {session.user.name}{" "}
      <button className={css.logout} onClick={onSignOut}>
        Logout
      </button>
    </div>
  );
};
