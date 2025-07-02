import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-blue-950 to-blue-900 text-white">
            <div className="grid grid-cols-1 text-center md:grid-cols-3 gap-8 px-6 py-10">
                {/* Left: About */}
                <div>
                    <h3 className="text-xl font-bold mb-3">Career Bridge</h3>
                    <p className="text-sm text-gray-300">
                        Empowering job seekers with intelligent matching and seamless application experiences.
                    </p>
                </div>

                {/* Center: Contact */}
                <div className="flex flex-col items-center">
                    <h3 className="text-xl font-bold mb-3">Contact</h3>
                    <ul className="space-y-3 text-gray-300 text-sm">
                        <li>
                            <Link
                                to="/contact"
                                className="flex items-start space-x-2 hover:text-white transition"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15A2.25 2.25 0 012.25 17.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                                <span>moloud.harara@gmail.com</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                className="flex items-start space-x-2 hover:text-white transition"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106a1.125 1.125 0 00-1.173.417l-.97 1.293a1.125 1.125 0 01-1.21.38A12.035 12.035 0 016.21 9.867a1.125 1.125 0 01.38-1.21l1.293-.97a1.125 1.125 0 00.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25Z" />
                                </svg>
                                <span>+212 6 51 44 48 71</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                className="flex items-start space-x-2 hover:text-white transition"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0Z" />
                                </svg>
                                <span>Rabat, Morocco</span>
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Right: Socials */}
                <div>
                    <h3 className="text-xl font-bold mb-3">Follow Us</h3>
                    <div className="flex justify-center space-x-4 pt-4">
                        <Link to="#" className="hover:opacity-80 transition">
                            {/* LinkedIn */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                                <path d="M19 0h-14C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zm-11 19H5v-10h3v10zm-1.5-11.3c-.97 0-1.5-.65-1.5-1.45s.54-1.45 1.54-1.45 1.5.65 1.5 1.45-.54 1.45-1.54 1.45zm13.5 11.3h-3v-5.6c0-1.35-.5-2.3-1.75-2.3-.96 0-1.54.65-1.79 1.27-.09.23-.11.56-.11.89V19h-3s.04-9.3 0-10h3v1.41c.4-.61 1.11-1.48 2.71-1.48 1.98 0 3.44 1.3 3.44 4.09V19z" />
                            </svg>
                        </Link>
                        <Link to="#" className="hover:opacity-80 transition">
                            {/* GitHub */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                                <path d="M12 0a12 12 0 0 0-3.79 23.4c.6.1.82-.26.82-.58v-2.02c-3.34.72-4.04-1.61-4.04-1.61a3.18 3.18 0 0 0-1.34-1.75c-1.1-.74.08-.73.08-.73a2.53 2.53 0 0 1 1.84 1.24 2.56 2.56 0 0 0 3.5 1 2.56 2.56 0 0 1 .76-1.6c-2.67-.3-5.47-1.34-5.47-5.95a4.66 4.66 0 0 1 1.24-3.23 4.34 4.34 0 0 1 .12-3.18s1.01-.33 3.3 1.24a11.3 11.3 0 0 1 6 0c2.3-1.57 3.3-1.24 3.3-1.24.66 1.52.24 2.64.12 3.18a4.65 4.65 0 0 1 1.24 3.23c0 4.62-2.8 5.64-5.48 5.94a2.87 2.87 0 0 1 .82 2.24v3.33c0 .32.22.69.82.58A12 12 0 0 0 12 0z" />
                            </svg>
                        </Link>
                        <Link to="#" className="hover:opacity-80 transition">
                            {/* Facebook */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                                <path d="M22 12.07C22 6.51 17.52 2 12 2S2 6.51 2 12.07c0 5 3.66 9.13 8.44 9.93v-7.02h-2.54v-2.91h2.54V9.79c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34v7.02C18.34 21.2 22 17.07 22 12.07z" />
                            </svg>
                        </Link>
                        <Link to="#" className="hover:opacity-80 transition">
                            {/* Twitter */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                                <path d="M22.46 6c-.77.35-1.6.59-2.46.7a4.28 4.28 0 0 0 1.88-2.37 8.53 8.53 0 0 1-2.7 1.03 4.26 4.26 0 0 0-7.26 3.88A12.1 12.1 0 0 1 3.14 4.8a4.25 4.25 0 0 0 1.32 5.69 4.2 4.2 0 0 1-1.93-.53v.05a4.26 4.26 0 0 0 3.41 4.18c-.47.13-.97.2-1.48.2-.36 0-.71-.03-1.05-.1a4.27 4.27 0 0 0 3.98 2.96 8.54 8.54 0 0 1-5.29 1.83c-.34 0-.67-.02-1-.06a12.07 12.07 0 0 0 6.54 1.92c7.85 0 12.14-6.5 12.14-12.13 0-.19-.01-.38-.02-.57a8.67 8.67 0 0 0 2.12-2.2z" />
                            </svg>
                        </Link>
                        <Link to="#" className="hover:opacity-80 transition">
                            {/* Instagram */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                                <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm4.5-.9a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2z" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom Text */}
            <div className="text-center py-4 text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Career Bridge. All rights reserved. Built with ❤️ by Mouloud
            </div>

        </footer>
    );
};

export default Footer;
