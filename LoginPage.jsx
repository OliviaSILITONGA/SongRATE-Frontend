import Logo from "../components/Logo";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#1D2128]  to-[#30353F] px-6">
      <div className="bg-[#1B1D24] shadow-xl rounded-2xl p-8 w-full max-w-md">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Welcome Back!
        </h1>

        {/* Form */}
        <form className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col text-left">
            <label className="text-white font-medium mb-1">
              Username or Email
            </label>
            <input
              type="email"
              className="border rounded-lg text-gray-500 px-4 py-2  bg-[#3E424B] focus:outline-none focus:ring-2 focus:ring-[#FAD64F]"
              placeholder="Username or Email"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col text-left">
            <label className="text-white font-medium mb-1">Password</label>
            <input
              type="password"
              className="border rounded-lg text-gray-500 px-4 py-2 bg-[#3E424B] focus:outline-none focus:ring-2 focus:ring-[#FAD64F]"
              placeholder="Enter your password"
            />
          </div>

          {/* Forgot password */}
          <a
            className="text-right text-sm text-white hover:underline cursor-pointer"
            href="/forgot-password"
          >
            Forgot Password?
          </a>

          {/* Login Button */}
          <button className="bg-[#FAD64F] text-black font-bold py-2 rounded-lg hover:bg-[#3E424B] transition">
            Log in
          </button>
        </form>

        {/* Divider */}
        <div className="my-4 flex items-center">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-400 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Sign Up */}
        <p className="text-center text-gray-700">
          <a href="/signup" className="text-white font-medium hover:underline">
            Create an Account
          </a>
        </p>
      </div>
    </div>
  );
}
