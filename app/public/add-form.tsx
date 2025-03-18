"use client";

import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { createTodo } from "@/app/actions";

const initialState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      Submit
    </button>
  );
}

export function AddForm() {
  // useActionState is available with React 19 (Next.js App Router)
  const [state, formAction] = useFormState(createTodo, initialState);

  return (
    <form action={formAction}>
      <label htmlFor="email">Enter Email</label>
      <input type="hidden" id="email" name="email" required />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>

      <label htmlFor="email">Enter Name</label>
      <input type="hidden" id="name" name="name" required />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>

      <label htmlFor="email">Enter Message</label>
      <input type="text" id="message" name="message" required />
      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}