"use client";

import { useSession } from "next-auth/react";

const MyAccountPage = ({}) => {
  const { data } = useSession();

  if (!data?.user) {
    return <h3>You are not currently logged in.</h3>;
  }

  const { name, role, committeeTitle } = data.user;

  return (
    <>
      <h1>Hello {name}</h1>

      <p>Your current role is: {role}</p>
      {committeeTitle && <p>Your current committee position is: {committeeTitle}</p>}
    </>
  );
};

export default MyAccountPage;
