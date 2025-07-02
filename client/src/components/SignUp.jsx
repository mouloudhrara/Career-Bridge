import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';
const SignUp = () => {
  const [userType, setUserType] = useState("user");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [CompanyPassword, setCompanyPassword] = useState("");
  const {signup, error, isLoading} = useSignup();

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
    const handleSubmit = async (e) => {
  e.preventDefault();
  await signup(
    firstName,
    lastName,
    email,
    password,
    userType,
    companyName,
    CompanyPassword
  );
};


  return (
    <div className="relative h-screen w-full flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('src/images/tower-bridge.jpg')" }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Main Container */}
      <div className="relative z-10 bg-white bg-opacity-90 p-0 rounded-lg shadow-2xl w-[90%] max-w-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Side */}
        <div className="md:w-1/2 w-full bg-gradient-to-r from-blue-950 to-blue-900 text-white p-8 flex flex-col justify-center items-center">
          <h2 className="text-3xl text-center font-bold mb-4">Welcome to Career Bridge!</h2>
          <p className="text-center text-sm font-light">
            Find the right job or the right talent. Build your future with us.
          </p>
        </div>

        {/* Right Side */}
        <form className="md:w-1/2 w-full p-8" onSubmit={handleSubmit}>
          <h3 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-950 to-blue-900 text-transparent bg-clip-text">
            Create Account
          </h3>

          {/* Radio Buttons */}
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

          {/* Form Fields */}
          <div className="space-y-3">
            {renderInput("text", "First Name", firstName, (e) => setFirstName(e.target.value), (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            ))}

            {renderInput("text", "Last Name", lastName, (e) => setLastName(e.target.value), (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            ))}

            {renderInput("email", "Email", email, (e) => setEmail(e.target.value), (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            ))}

            {renderInput("password", "Password", password, (e) => setPassword(e.target.value), (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="w-5 h-5" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
</svg>


            ))}

            {userType === "jobposter" && (
              <>
                {renderInput("text", "Company Name", companyName, (e) => setCompanyName(e.target.value), (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                  </svg>
                ))}

                {renderInput("password", "Company Password", CompanyPassword, (e) => setCompanyPassword(e.target.value), (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor"
  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-password">
  <circle cx="6" cy="12" r="1.5"/>
  <circle cx="12" cy="12" r="1.5"/>
  <circle cx="18" cy="12" r="1.5"/>
</svg>

                ))}
              </>
            )}
          </div>

          <div className="flex justify-center">
            <button disabled={isLoading} className="w-3/4 mt-6 rounded-full border-4 border-white bg-gradient-to-r from-blue-950 to-blue-900 text-white font-semibold py-2 hover:opacity-90 transition duration-200">
              Sign Up
            </button>
            {error &&  <div className="error">{error}</div>}
          </div>
          <p className="text-center text-sm font-extralight mt-2">
            Already have an account? <span className="text-blue-700 underline"><Link to="/login">Sign in</Link></span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
