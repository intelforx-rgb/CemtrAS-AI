import React, { useState } from "react";

interface ApiResponse {
  code: string;
  message: string;
  providerLimitHit: boolean;
  isRetryable: boolean;
}

const LoginScreen = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);

  const handleApiError = (response: ApiResponse) => {
    if (response.code === "rate-limited") {
      setApiResponse(response);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-4xl flex flex-col md:flex-row">
        {/* Left Section - Branding */}
        <div className="md:w-1/2 flex flex-col items-center text-center mb-8 md:mb-0">
          <img
            src="/logo.png"
            alt="CemtrAS AI Logo"
            className="w-40 mb-4"
          />
          <h1 className="text-2xl font-bold mb-2">CemtrAS AI</h1>
          <p className="text-yellow-600 mb-6">
            AI-Driven Engineering for Cement Excellence.
          </p>

          {/* Founder Info */}
          <div className="flex flex-col items-center mt-4">
            <img
              src="/untitled (10) copy.jpeg"
              alt="Founder Vipul Sharma"
              className="w-20 h-20 rounded-full shadow-md mb-2"
            />
            <span className="text-sm font-semibold">Founder: Vipul Sharma</span>
          </div>
        </div>

        {/* Right Section - Forms */}
        <div className="md:w-1/2">
          {/* Tabs */}
          <div className="flex mb-6">
            <button
              className={`flex-1 py-2 font-bold ${
                activeTab === "login" ? "border-b-4 border-blue-700" : ""
              }`}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 font-bold ${
                activeTab === "register" ? "border-b-4 border-yellow-500" : ""
              }`}
              onClick={() => setActiveTab("register")}
            >
              Register
            </button>
          </div>

          {/* Rate-limit warning */}
          {apiResponse && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
              {apiResponse.message}
            </div>
          )}

          {/* Forms */}
          {activeTab === "login" ? (
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email or Mobile"
                className="p-2 border rounded"
              />
              <input
                type="password"
                placeholder="Password"
                className="p-2 border rounded"
              />
              <label className="flex items-center gap-2">
                <input type="checkbox" /> Remember Me
              </label>
              <button className="bg-blue-700 text-white py-2 rounded font-bold">
                Login
              </button>
              <a href="#" className="text-sm text-blue-700">
                Forgot Password?
              </a>
            </form>
          ) : (
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="p-2 border rounded"
              />
              <input
                type="email"
                placeholder="Email"
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Mobile Number"
                className="p-2 border rounded"
              />
              <input
                type="password"
                placeholder="Password"
                className="p-2 border rounded"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="p-2 border rounded"
              />
              <button className="bg-yellow-500 text-white py-2 rounded font-bold">
                Register
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
