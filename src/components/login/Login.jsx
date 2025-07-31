import { useNavigate } from "react-router-dom";
import { loginUser } from "@/api/auth";
import { useState, useEffect } from "react";
import { BookOpen } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
   const style =
    "w-full border gap-2 border-gray-300 p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-black";
   useEffect(()=>{
      document.title = "Login | Library Manager"
    }, [])
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { access_token, user } = await loginUser({ email, password });
      login(user, access_token);

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
    <div className="fixed top-0 left-0 grid  bg-gray-50 place-items-center m-0 w-full h-screen p-0 ">
      <div className=" grid grid-cols-1 align-middle my-auto p-6 w-[95%] sm:w-[400px] sm:mx-auto rounded-md bg-white shadow-gray-300 shadow-sm">
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
              className={style}
              style={{ outlineOffset: "4px" }}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className="font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className={style}
              style={{ outlineOffset: "4px" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2  border-1 rounded-md p-2 font-semibold bg-black text-white hover:bg-gray-800 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mb-4"
          >
            {isLoading && (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            <span>{isLoading ? "Signing in..." : "Sign in"}</span>
          </button>
          {/* <hr className="text-gray-600"/>
          <div className="text-gray-500">
            <p>Test credentials</p>
          <div className="grid grid-cols-2 text-xs text-left">
              <div>
                librarian: <br/>librarian@library.com <br/>
                password: librarian123
              </div>
              <div>
                admin: <br/>admin@library.com <br/>
                password: admin123
              </div>
          </div>
          </div> */}
        </form>
      </div>
    </div>
  );
}
