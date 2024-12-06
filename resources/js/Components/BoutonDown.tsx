import React from "react";

export default function BoutonDown({ scrollToId = "next-section", label = "Nageons!" }) {
    const handleScroll = () => {
        const section = document.getElementById(scrollToId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 pointer-events-none">
            <button
                className="pointer-events-auto bg-white/80 text-blue-500 px-6 py-3 rounded-full shadow-lg hover:bg-blue-500 hover:text-white transition flex items-center gap-2"
                onClick={handleScroll}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                {label}
            </button>
        </div>
    );
}
