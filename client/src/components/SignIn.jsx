import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [userType, setUserType] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyPassword, setCompanyPassword] = useState("");

  const renderInput = (type, placeholder, value, onChange, icon) => (
    <div className="relative">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
        {icon}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-3 py-2 rounded-xl bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log({ userType, email, password, companyPassword });
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('src/images/tower-bridge.jpg')" }} />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <div className="relative z-10 bg-white bg-opacity-90 p-0 rounded-lg shadow-2xl w-[90%] max-w-2xl flex flex-col md:flex-row overflow-hidden">
        <div className="md:w-1/2 w-full bg-gradient-to-r from-blue-950 to-blue-900 text-white p-8 flex flex-col justify-center items-center">
          <h2 className="text-3xl text-center font-bold mb-4">Welcome Back!</h2>
          <p className="text-center text-sm font-light">
            Login to find your job or manage offers.
          </p>
        </div>

        <form className="md:w-1/2 w-full p-8" onSubmit={handleLogin}>
          <h3 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-950 to-blue-900 text-transparent bg-clip-text">
            Login
          </h3>

          <div className="flex justify-center gap-6 mb-4">
            <label className={`cursor-pointer ${userType === "user" ? "font-medium" : "text-gray-400 font-light"}`}>
              <input
                type="radio"
                name="userType"
                value="user"
                checked={userType === "user"}
                onChange={() => setUserType("user")}
                className="mr-2"
              />
              User
            </label>
            <label className={`cursor-pointer ${userType === "jobposter" ? "font-medium" : "text-gray-400 font-light"}`}>
              <input
                type="radio"
                name="userType"
                value="jobposter"
                checked={userType === "jobposter"}
                onChange={() => setUserType("jobposter")}
                className="mr-2"
              />
              Job Poster
            </label>
          </div>

          <div className="space-y-3">
            {renderInput("email", "Email", email, (e) => setEmail(e.target.value), (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            ))}

            {renderInput("password", "Password", password, (e) => setPassword(e.target.value), (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            ))}

            {userType === "jobposter" && renderInput("password", "Company Password", companyPassword, (e) => setCompanyPassword(e.target.value), (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-password">
                <circle cx="6" cy="12" r="1.5" />
                <circle cx="12" cy="12" r="1.5" />
                <circle cx="18" cy="12" r="1.5" />
              </svg>
            ))}
          </div>

          <div className="flex justify-center">
            <button className="w-3/4 mt-6 rounded-full border-4 border-white bg-gradient-to-r from-blue-950 to-blue-900 text-white font-semibold py-2 hover:opacity-90 transition duration-200">
              Log In
            </button>
          </div>
          <p className="text-center text-sm font-extralight mt-2">
            Don't have an account? <span className="text-blue-700 underline"><Link to="/signup">Sign up</Link></span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
