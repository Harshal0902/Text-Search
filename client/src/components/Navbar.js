import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

export default function Navbar({ searchPostData, handleSearchOnChange }) {
    const [isOnChange, setIsOnChange] = useState(false);
    const [targetValue, setTargetValue] = useState("");

    useEffect(() => {
        setIsOnChange(false);
    }, [searchPostData]);

    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 w-full">
                    <Link to="/" className="flex-shrink-0 flex items-center">
                        <span className="ml-2 text-xl font-medium text-gray-900">Text Search</span>
                    </Link>
                    <div className="flex-1 ml-36 flex justify-center">
                        <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                            {!isOnChange ? (
                                <BsSearch className="w-5 h-5 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                            ) : (
                                <svg className="animate-spin w-5 h-5 absolute top-1/2 left-3 -ml-1/2 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l1.414-1.414zM20 12a8 8 0 01-8 8v-4a4 4 0 004-4h4zm-2-5.291A7.962 7.962 0 0120 12h4c0-3.042-1.135-5.824-3-7.938l-1.414 1.414z" />
                                </svg>
                            )}
                            <input
                                type="text"
                                placeholder="search ..."
                                className="block pl-10 pr-3 w-72 py-2 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 focus:outline-none focus:placeholder-gray-500 focus:border-blue-300 focus:ring-1 focus:ring-blue-300"
                                aria-describedby="search"
                                onChange={({ target }) => {
                                    handleSearchOnChange(target);
                                    setIsOnChange(true);
                                    setTargetValue(target.value);
                                }}
                            />
                            {targetValue.length > 0 && (
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    {searchPostData.length === 0 ? (
                                        <p className="text-sm text-red-500">No Record Found !!</p>
                                    ) : (
                                        <p className="text-sm text-gray-500">Found {searchPostData.length} Found ...</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to="/posts/add">
                            <button className="hidden sm:block px-4 py-2 rounded-md bg-blue-500 text-white">
                                Add Post
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
