import React from "react";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl sm:text-6xl font-bold mb-4 text-gray-900">
        Welcome to MicDrop
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 max-w-xl mb-8">
        Analyze your voice, detect pitch, and fine-tune your vocals to get the best results
      </p>
      <div className="flex gap-4">
        <button className="bg-black text-white px-6 py-3 rounded-2xl shadow hover:bg-gray-800 transition">
          Get Started
        </button>
        <button className="bg-gray-100 text-gray-800 px-6 py-3 rounded-2xl hover:bg-gray-200 transition">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
