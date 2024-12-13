"use client";
import { useRouter } from "next/navigation";

const ForgotPasswordPage = () => {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md space-y-8 px-8 py-10 rounded-[20px] backdrop-blur-[40px] border border-gray-700 shadow-lg shadow-cyan-500/20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-center">
            Here is your Email & Password
          </h2>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Email</label>
            <div className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-700 text-white">
              admin@gmail.com
            </div>
            <label className="text-sm font-medium text-gray-200">
              Password
            </label>
            <div className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-700 text-white">
              admin123
            </div>
          </div>

          <button
            onClick={() => router.push("/auth/login")}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-200"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
