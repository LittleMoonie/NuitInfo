import React, { useState } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Navbar */}
            <div
                className="fixed top-0 left-1/2 transform -translate-x-1/2 w-5/6 flex justify-between items-center bg-white/10 backdrop-blur-md p-4 rounded-lg z-50"
            >
                <h1 className="text-white text-2xl font-semibold">Echos of Life</h1>

                {/* Hamburger Icon */}
                <div
                    className="md:hidden cursor-pointer text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-4">
                    <a href="#" className="text-white hover:underline">Link</a>
                    <a href="#" className="text-white hover:underline">Link</a>
                    <a href="#" className="text-white hover:underline">Link</a>
                    <a href="#" className="text-white hover:underline">Link</a>
                </nav>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="fixed top-14 left-0 w-full bg-white/10 backdrop-blur-md p-4 flex flex-col items-center space-y-4 z-40 md:hidden">
                    <a href="#" className="text-white hover:underline">Link</a>
                    <a href="#" className="text-white hover:underline">Link</a>
                    <a href="#" className="text-white hover:underline">Link</a>
                    <a href="#" className="text-white hover:underline">Link</a>
                </div>
            )}
        </>
    );
}
