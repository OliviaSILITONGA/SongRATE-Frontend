export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#1D2128]  to-[#30353F] px-6">
      <div className="bg-[#1B1D24] shadow-xl rounded-2xl p-8 w-full max-w-md">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Welcome!
        </h1>

        {/* Form */}
        <form className="flex flex-col gap-4">
          {/* Username */}
          <div className="flex flex-col text-left">
            <label className="text-white font-medium mb-1">
              Full Name or Username
            </label>
            <input
              type="text"
              className="border rounded-lg text-gray-200 px-4 py-2  bg-[#3E424B] focus:outline-none focus:ring-2 focus:ring-[#FAD64F]"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col text-left">
            <label className="text-white font-medium mb-1">Email</label>
            <input
              type="email"
              className="border rounded-lg text-gray-200 px-4 py-2  bg-[#3E424B] focus:outline-none focus:ring-2 focus:ring-[#FAD64F]"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col text-left">
            <label className="text-white font-medium mb-1">Password</label>
            <input
              type="password"
              className="border rounded-lg text-gray-200 px-4 py-2  bg-[#3E424B] focus:outline-none focus:ring-2 focus:ring-[#FAD64F]"
              placeholder="Create a password"
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col text-left">
            <label className="text-white font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              className="border rounded-lg text-gray-200 px-4 py-2  bg-[#3E424B] focus:outline-none focus:ring-2 focus:ring-[#FAD64F]"
              placeholder="Confirm your password"
            />
          </div>

          {/* Button */}
          <button className="bg-yellow-300 text-black font-bold py-2 rounded-lg hover:bg-yellow-200 transition">
            Sign Up
          </button>
        </form>

        {/* Link to login */}
        <p className="text-center font-medium text-gray-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-gray-500 font-medium hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
