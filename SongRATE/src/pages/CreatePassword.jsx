import Logo from "../components/Logo";

export default function CreatePassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#1D2128]  to-[#30353F] px-6">
      <Logo />
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Create new password
        </h1>

        <p className="text-gray-600 text-center mb-6">
          Your new password must be different from previously used passwords.
        </p>

        {/* Form */}
        <form className="flex flex-col gap-4">
          {/* New Password */}
          <div className="flex flex-col text-left">
            <label className="text-gray-700 font-medium mb-1">
              New Password
            </label>
            <input
              type="password"
              className="rounded-lg bg-[#A7A7A7] px-4 py-2 focus:ring-2 focus:ring-[#FAD64F]"
              placeholder="Enter new password"
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col text-left">
            <label className="text-gray-700 font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              className="rounded-lg bg-[#A7A7A7] px-4 py-2 focus:ring-2 focus:ring-[#FAD64F]"
              placeholder="Confirm new password"
            />
          </div>

          {/* Button */}
          <button className="bg-[#1B1D24] text-white font-bold py-2 rounded-lg hover:bg-gray-800 transition">
            Change Password
          </button>
        </form>

        {/* Back to login */}
        <p className="text-center text-gray-700 mt-4">
          <a href="/login" className="text-black hover:underline">
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
}
