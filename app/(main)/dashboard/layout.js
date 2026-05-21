import DashboardPage from "./page";
import { BarLoader } from "react-spinners";
import { Suspense } from "react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Layout() {
  return (
    <div className="px-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-6xl font-bold tracking-tight gradient-title">
          Dashboard
        </h1>
      </div>
      <SignedIn>
        <Suspense
          fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
        >
          <DashboardPage />
        </Suspense>
      </SignedIn>
      <SignedOut>
        <div className="mt-8 flex flex-col items-center gap-4">
          <p className="text-sm text-muted-foreground">Please sign in to access your dashboard.</p>
          <SignInButton forceRedirectUrl="/dashboard">
            <Button>Sign In</Button>
          </SignInButton>
        </div>
      </SignedOut>
    </div>
  );
}