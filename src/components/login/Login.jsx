import { useNavigate } from "react-router-dom";
import { loginUser } from "@/api/auth";
import { useState } from "react";
import { BookOpen } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { access_token, user } = await loginUser({ email, password });
      login(user, access_token);
console.log(user)
      localStorage.setItem("userInfo", JSON.stringify(user));
      localStorage.setItem("accessToken", access_token);
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 grid  bg-white place-items-center m-0 w-full h-screen ">
      <div className=" grid grid-cols-1 align-middle my-auto p-6 w-[400px] mx-auto  rounded-md bg-white shadow-gray-300 shadow-sm">
        <form onSubmit={handleLogin} action="">
          <div className="flex justify-center">
            <BookOpen className="text-blue-600 w-12 h-12" />
          </div>
          <h1 className="text-2xl font-bold py-0">Library Manager System</h1>
          <p className="text-gray-500 text-[14px] pb-4">
            Sign in to your account to continue
          </p>
          <div className="flex flex-col items-start">
            <label htmlFor="email" className="font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              name="email"
              value={email}
              placeholder="Enter your username"
              className="border-1 rounded-md border-gray-300 w-full px-2 py-2 mb-4 focus:outline-blue-500 focus:ring-offset-2"
              style={{ outlineOffset: "4px" }}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="border-1 rounded-md border-gray-300 w-full px-2 py-2 mb-4 focus:outline-blue-500 focus:ring-offset-2"
              style={{ outlineOffset: "4px" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 border-1 rounded-md p-2 font-semibold bg-black text-white hover:bg-gray-800 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading && (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            <span>{isLoading ? "Signing in..." : "Sign in"}</span>
          </button>
          
        </form>
      </div>
    </div>
  );
}
