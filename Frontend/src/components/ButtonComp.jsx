import React from "react";

export const ButtonComp = ({ text, load }) => {
  return (
    <button
      className="bg-clayBrown text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a361d] focus:ring-opacity-50 disabled:opacity-80"
      type="submit"
      disabled={load}
    >
      {load ? (
        <span className="flex items-center justify-center">
          <span className="mr-2">🚀 Logging in...</span>
          <span className="animate-spin text-xl">🔄</span>
        </span>
      ) : (
        text
      )}
    </button>
  );
};
