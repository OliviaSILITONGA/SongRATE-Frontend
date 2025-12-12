import { useEffect } from "react";

export default function Modal({ isOpen, onClose, title, message, type = "info" }) {
  if (!isOpen) return null;

  const iconColor = type === "success" ? "text-green-400" : "text-red-400";
  const icon = type === "success" ? (
    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
  ) : (
    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="bg-[#1F222A] border border-gray-700 rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl transform transition-all scale-100 text-center">
        <div className={`mb-4 ${iconColor}`}>
          {icon}
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 mb-8">{message}</p>

        <button
          onClick={onClose}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-xl transition duration-200"
        >
          OK
        </button>
      </div>
    </div>
  );
}