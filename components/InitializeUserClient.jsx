"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

export default function InitializeUserClient() {
  const { isLoaded } = useAuth();

  useEffect(() => {
    if (!isLoaded) return; // Wait for Clerk to load

    const initializeUser = async () => {
      try {
        const res = await fetch("/api/user/initialize", {
          method: "POST",
          credentials: "include",
        });

        if (!res.ok) {
          const errorData = await res.json();
          console.error("Failed to initialize user:", errorData);
          return;
        }

        const data = await res.json();
        console.log("User initialized successfully:", data);
      } catch (err) {
        console.error("Failed to initialize user:", err);
      }
    };

    initializeUser();
  }, [isLoaded]);

  return null;
}
