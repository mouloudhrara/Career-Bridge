import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-50 to-blue-100">
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Brand */}
        <div>
          <Link to="/" className="text-xl font-bold text-indigo-900">
            Career-Bridge
          </Link>
        </div>

        {/* Center Links */}
        <ul className="flex gap-12 text-sm">
          <li>
            <Link
              to="/"
              className="flex items-center gap-2 font-light group hover:font-normal transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                className="size-5 group-hover:stroke-[2] transition"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 
                     1.152-.439 1.591 0L21.75 12M4.5 
                     9.75v10.125c0 .621.504 1.125 
                     1.125 1.125H9.75v-4.875c0-.621.504-1.125 
                     1.125-1.125h2.25c.621 0 1.125.504 
                     1.125 1.125V21h4.125c.621 0 
                     1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/jobs"
              className="flex items-center gap-2 font-light group hover:font-normal transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                className="size-5 group-hover:stroke-[2] transition"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18
                     -2.087.277-4.216.42-6.378.42s-4.291-.143
                     -6.378-.42c-1.085-.144-1.872-1.086-1.872
                     -2.18v-4.25m16.5 0a2.18 2.18 0 0 0
                     .75-1.661V8.706c0-1.081-.768-2.015-1.837
                     -2.175a48.114 48.114 0 0 0-3.413-.387m4.5
                     8.006c-.194.165-.42.295-.673.38A23.978 
                     23.978 0 0 1 12 15.75c-2.648 0-5.195-.429
                     -7.577-1.22a2.016 2.016 0 0 1-.673-.38m0
                     0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768
                     -2.015 1.837-2.175a48.111 48.111 0 0 1 
                     3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 
                     13.5 3h-3a2.25 2.25 0 0 0-2.25 
                     2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 
                     0M12 12.75h.008v.008H12v-.008Z"
                />
              </svg>
              Jobs
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              className="flex items-center gap-2 font-light group hover:font-normal transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                className="size-5 group-hover:stroke-[2] transition"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 
                  0 0 1-2.25 2.25h-15a2.25 2.25 
                  0 0 1-2.25-2.25V6.75m19.5 0A2.25 
                  2.25 0 0 0 19.5 4.5h-15a2.25 
                  2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 
                  2.25 0 0 1-1.07 1.916l-7.5 
                  4.615a2.25 2.25 0 0 1-2.36 
                  0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Auth Links */}
        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-5 py-2 border border-black rounded-2xl text-black hover:bg-indigo-700 hover:text-white hover:border-indigo-700 transition-colors duration-300"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="px-5 py-2 border border-black rounded-2xl text-black hover:bg-indigo-700 hover:text-white hover:border-indigo-700 transition-colors duration-300"
          >
            Sign up
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
