"use client";

import { useState, useEffect } from "react";
import { TourProvider } from "@reactour/tour";

// const steps = [
//   {
//     selector: ".message-form",
//     content: "This is the login form. Enter your email and password here.",
//   },
//   {
//     selector: ".logout-button",
//     content: "Click this button to log out.",
//   },
// ];

export default function TourGuide({ children }: { children: React.ReactNode }) {
    const [steps, setSteps] = useState([]);
    useEffect(() => {
        const fetchSteps = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/popups"); // Fetch steps from API
            const data = await res.json();
            console.log(data.steps)
            const sortedSteps = data.steps.sort((a, b) => a.display_order - b.display_order)
            setSteps(sortedSteps); // Set fetched steps in state
            console.log(steps)
        } catch (error) {
            console.error("Error fetching tour steps:", error);
        }
        };

        fetchSteps()
    }, []);

    if (steps.length === 0) return <>{children}</>;
    return (
        <TourProvider steps={steps}>
            {children}
        </TourProvider>
    );
}
