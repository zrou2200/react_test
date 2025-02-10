
import postgres from "postgres";

import { AddUser } from "@/app/helpers/add-user";
import { DeleteUser } from "@/app/helpers/delete-user";

let sql = postgres(process.env.DATABASE_URL || process.env.POSTGRES_URL!, {
  ssl: "allow",
});
export default async function Home() {
  let users = await sql`SELECT * FROM users`


  return (
    <main>
      <h1 className="sr-only">Test</h1>
      <AddUser />
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username}
            <DeleteUser id={user.id} username={user.username} />
          </li>
        ))}
      </ul>
    </main>
  );
}