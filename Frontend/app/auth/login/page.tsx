"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        action: "login",
      });
      if (result?.ok) {
        router.push("/admin");
      }
      if (result?.error) {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md space-y-8 px-5 py-8 rounded-[15px] backdrop-blur-[40px] border ">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-3xl font-bold text-white">Welcome back</h2>
          <p className="text-gray-400">Please enter your details to sign in</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-full px-3 py-2 rounded-lg bg-black/50 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="w-full px-3 py-2 rounded-lg bg-black/50 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              className="text-sm text-cyan-500 hover:text-cyan-400"
              onClick={() => router.push("/auth/forgot-password")}
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-black bg-white from-cyan-300 to-green-300 hover:from-cyan-400 hover:to-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              "Sign in"
            )}
          </button>
        </form>
        <div className="text-center">
          <span className="text-gray-400 text-sm">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/auth/signup")}
              className="text-[#2adcff] hover:text-cyan-400 hover:underline "
            >
              Register
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
