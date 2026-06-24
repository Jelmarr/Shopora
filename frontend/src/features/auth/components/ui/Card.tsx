import React from "react";

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white rounded-xl p-6 w-md text-black border-gray-200 border shadow-lg">
      {children}
    </div>
  );
};

export default Card;
