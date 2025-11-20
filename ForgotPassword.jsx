export default function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#1D2128]  to-[#30353F] px-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-[#1B1D24] mb-4">
          Forgot your password?
        </h1>

        {/* Form */}
        <form className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col text-left">
            <label className="text-gray-700 font-medium mb-1">
              Username or Email
            </label>
            <input
              type="email"
              className="rounded-lg bg-[#A7A7A7] px-4 py-2 focus:ring-2 focus:ring-[#FAD64F]"
              placeholder="Enter your username or email"
            />
          </div>

          {/* Button */}
          <div className="flex flex-col text-left">
            <p className="text-gray-600 text-center mb-2">
              Verification link will be sent to your email!
            </p>
            <button className="bg-[#1B1D24] text-white font-bold py-2 rounded-lg hover:bg-[#A7A7A7] transition">
              Send to Email
            </button>
          </div>
        </form>

        {/* Back to login */}
        <p className="text-center text-gray-700 mt-4">
          <a href="/login" className="text-gray-700 hover:underline">
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
}
