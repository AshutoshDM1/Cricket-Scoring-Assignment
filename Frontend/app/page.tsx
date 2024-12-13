"use client";
import { ToggleMode } from "@/components/ToggleMode";
import { Button } from "@/components/ui/button";
import UserCricketScorecard from "@/components/user-cricket";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-3 items-center min-h-screen p-2">
      <div className="min-h-[5vh] w-full flex items-center justify-end">
        <div className="flex flex-wrap items-center gap-3">
          <Button
            className="text-sm "
            onClick={() => router.push("/auth/login")}
          >
            Login for Admin
          </Button>
          <Button
            className="text-sm "
            onClick={() => router.push("/auth/signup")}
          >
            Signup
          </Button>
          <ToggleMode />
        </div>
      </div>
      <UserCricketScorecard />
    </div>
  );
}
