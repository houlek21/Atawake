import { useMemo } from "react";

const WhatCustomersSay = () => {
  const snippets = [
    "The fabric is soft and the skirt fits perfectly.",
    "Exactly as pictured, beautiful details!",
    "It’s longer than expected but so comfortable.",
    "Amazing craftsmanship. Love the quality!",
    "Shipping was quick, and the seller is kind.",
    "The color and ribbons are stunning.",
    "My new favorite piece — thank you!",
    "Feels so special and well-made.",
    "Looks even better in person!",
    "Great communication from the seller.",
  ];

  const selected = useMemo(() => {
    const index = Math.floor(Math.random() * snippets.length);
    return snippets[index];
  }, []);

  return (
    <div className="p-4 rounded-md max-w-lg">
      <p className="text-black font-Inter font-semibold mb-2">
        What customers say ✨
      </p>
      <p className="text-sm text-[#3c2e24]">{selected}</p>
      <p className="text-sm text-[#6D6D6D]">
        AI-generated from the text of customer reviews
      </p>
    </div>
  );
};

export default WhatCustomersSay;
