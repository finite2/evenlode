import { Role } from "@prisma/client";
import { listUsers } from "../../prisma/api-user";

type Props_UserList = {
  searchParams: {
    search?: string;
    role?: string;
  };
};

const UserList = async ({ searchParams }: Props_UserList) => {
  const searchString = searchParams.search ?? undefined;
  const role = (searchParams.role ?? undefined) as Role | "club" | undefined;

  const users = await listUsers(searchString, role);

  return (
    <>
      <h1>Members</h1>
      {users.length === 0 && <div>No users found</div>}

      {users.map((u, i) => (
        <div key={i}>{u.name}</div>
      ))}
    </>
  );
};

export default UserList;
