"use server";

import { revalidatePath } from "next/cache";
import postgres from "postgres";
import { z } from "zod";

let sql = postgres(process.env.DATABASE_URL || process.env.POSTGRES_URL!, {
  ssl: "allow",
});

// CREATE TABLE todos (
//   id SERIAL PRIMARY KEY,
//   text TEXT NOT NULL
// );

export async function createTodo(prevState: {message: string;}, formData: FormData) {
  
  console.log(formData)
  
  const schema = z.object({
    name: z.string().min(1),
    email: z.string().min(1),
    message: z.string().min(1)
  });
  const parse = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message")
  });
  if (!parse.success) {
    console.log('F')
    return { message: "Failed to create todo" };
  }

  const data = parse.data;
  console.log(data)
  try {
    await sql`
      INSERT INTO todos (text, name, email)
      VALUES (${data.message}, ${data.name}, ${data.email})`;

    revalidatePath("/");
    return { message: `Added name ${data.name}` };
  } catch (e) {
    return { message: "Failed to create todo" };
  }
}

export async function createUser(prevState: {message: string;}, formData: FormData) {
  
  const schema = z.object({
    username: z.string().min(1),
    email: z.string().min(1),
    password: z.string().min(1)
  });
  const parse = schema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password")
  });
  if (!parse.success) {
    return { message: "Failed to create todo" };
  }

  const data = parse.data;
  console.log(data.username)
  console.log(data.email)
  console.log(data.password)
  try {
    await sql`
      INSERT INTO users (username, password, email)
      VALUES (${data.username}, ${data.password}, ${data.email})`;

    revalidatePath("/");
    return { message: `Added name ${data.username}` };
  } catch (e) {
    return { message: "Failed to create todo" };
  }
}

export async function deleteTodo(
  prevState: {
    message: string;
  },
  formData: FormData,
) {
  const schema = z.object({
    id: z.string().min(1),
    todo: z.string().min(1),
  });
  const data = schema.parse({
    id: formData.get("id"),
    todo: formData.get("todo"),
  });

  try {
    await sql`
      DELETE FROM todos
      WHERE id = ${data.id};
    `;

    revalidatePath("/");
    return { message: `Deleted todo ${data.todo}` };
  } catch (e) {
    return { message: "Failed to delete todo" };
  }
}

export async function deleteUser(
  prevState: {
    message: string;
  },
  formData: FormData,
) {
  const schema = z.object({
    id: z.string().min(1),
    username: z.string().min(1),
  });
  const data = schema.parse({
    id: formData.get("id"),
    username: formData.get("username"),
  });

  try {
    await sql`
      DELETE FROM users
      WHERE id = ${data.id};
    `;

    revalidatePath("/");
    return { message: `Deleted todo ${data.username}` };
  } catch (e) {
    return { message: "Failed to delete todo" };
  }
}
