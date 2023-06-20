import React from "react";

export default function DialogComponent({
    openState,
    handleDialogClose,
    content,
}) {
    return (
        <div
            className={`fixed inset-0 flex items-center justify-center bg-opacity-75 bg-gray-900 ${openState ? "visible" : "invisible"
                }`}
        >
            <div className="bg-white w-3/4 max-w-md p-4 rounded-md shadow-md">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={handleDialogClose}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                {content}
            </div>
        </div>
    );
}
