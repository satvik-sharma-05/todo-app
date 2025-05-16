import React from 'react';

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center p-4 bg-gray-900 text-white shadow-md sticky top-0 z-50">
            <div className="font-bold text-2xl font-sans tracking-wide">
                To Do App
            </div>
            <ul className="flex list-none m-0 p-0">
                <li className="mx-6">
                    <a
                        href="#"
                        className="text-white text-base transition-colors duration-300 hover:text-blue-400"
                    >
                        Home
                    </a>
                </li>
                <li className="mx-6">
                    <a
                        href="#"
                        className="text-white text-base transition-colors duration-300 hover:text-blue-400"
                    >
                        About
                    </a>
                </li>
                <li className="mx-6">
                    <a
                        href="#"
                        className="text-white text-base transition-colors duration-300 hover:text-blue-400"
                    >
                        Contact
                    </a>
                </li>
                <li className="mx-6">
                    <a
                        href="#"
                        className="text-white text-base transition-colors duration-300 hover:text-blue-400"
                    >
                        Services
                    </a>
                </li>
                <li className="mx-6">
                    <a
                        href="#"
                        className="text-white text-base transition-colors duration-300 hover:text-blue-400"
                    >
                        Blog
                    </a>
                </li>
                <li className="mx-6">
                    <a
                        href="#"
                        className="text-white text-base transition-colors duration-300 hover:text-blue-400"
                    >
                        FAQ
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
