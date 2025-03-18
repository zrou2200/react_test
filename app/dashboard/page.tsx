"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { useFormState } from "react-dom";
import { createTodo } from "@/app/actions";
import Tour, { useTour } from '@reactour/tour';
import { TourProvider } from "@reactour/tour";



const initialState = {
  message: "",
};

// const steps = [
//   {
//     selector: '.message-form',
//     content: 'Enter your desired message',
//   },
//   {
//     selector: '.logout-button',
//     content: 'Logout Here',
//   },
// ];


function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      Submit
    </button>
  );
}


export default function Dashboard() {
  const [user, setUser] = useState();
  const router = useRouter();
  const [state, formAction] = useFormState(createTodo, initialState);
  const { setIsOpen, steps } = useTour();
  // const [steps, setSteps] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1];

      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetch("http://localhost:5000/api/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  return (
    // <TourProvider>
      <div>
        <h1>Welcome, {user?.email || ""} </h1>
        <form action={formAction} className="message-form">
          <input type="hidden" id="email" name="email" value={user?.email || ""} required />
          <p aria-live="polite" className="sr-only" role="status">
            {state?.message}
            <span className="first-step">text</span>
          </p>

          <input type="hidden" id="name" name="name" value={user?.username || ""} required />
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
        <div>
          <button className="logout-button" onClick={() => { document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"; router.push("/login"); }}>
            Logout
          </button>
        </div>
        

        <div >
          <button className="tutorial-button" onClick={() => {
              if (steps.length > 0) {
                setIsOpen(true);
              } else {
                console.warn("Tour steps not loaded yet.");
              }
            }}> Open Tutorial</button>
        </div>
          
      </div>
    // {/* </TourProvider> */}
    
    
    
  );
}


