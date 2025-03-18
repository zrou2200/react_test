"use client";

import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { createUser } from "@/app/actions";
import { useRouter } from "next/navigation"

const initialState = {
  message: "",
};

function RegisterButton() {
  const { pending } = useFormStatus();
  const  router  = useRouter();

  return (
    <button type="submit" aria-disabled={pending} onSubmit={() => router.push('/login')}>
      Register
    </button>
  );
}

export function AddUser() {
  // useActionState is available with React 19 (Next.js App Router)
  const [state, formAction] = useFormState(createUser, initialState);

  return (
    <form action={formAction}>
      <label htmlFor="username">Enter Username</label>
      <input type="text" id="username" name="username" required />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>

      <label htmlFor="email">Enter Email</label>
      <input type="text" id="email" name="email" required />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>

      <label htmlFor="password">Enter Password</label>
      <input type="password" id="password" name="password" required />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>


      <RegisterButton />
    </form>
  );
}