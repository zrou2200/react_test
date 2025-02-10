import postgres from "postgres";

import { AddForm } from "@/app/helpers/add-form";
import { DeleteForm } from "@/app/helpers/delete-form";

let sql = postgres(process.env.DATABASE_URL || process.env.POSTGRES_URL!, {
  ssl: "allow",
});

export default async function Home() {
  let todos = await sql`SELECT * FROM todos`


  return (
    <main>
      <h1 className="sr-only">Test</h1>
      <AddForm />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.name}
            <DeleteForm id={todo.id} todo={todo.name} />
          </li>
        ))}
      </ul>
    </main>
  );
}


export async function Login() {
  let users = await sql`SELECT * FROM users`

  return (
    <main>
      <h1 className="sr-only">Test</h1>
        
    </main>
  );
}


export async function Register() {
  let users = await sql`SELECT * FROM users`

  return (
    <main>
      <h1 className="sr-only">Test</h1>
        
    </main>
  );
}

// import { useSession } from "next-auth/react";

// export default function HomePage() {
//   const { data: session } = useSession();

//   return (
//     <div>
//       {session ? (
//         <p>Welcome, {session.user.username}!</p>
//       ) : (
//         <p>Please log in to continue.</p>
//       )}
//     </div>
//   );
// }
