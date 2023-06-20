import React, { useState } from 'react';
import data from '../data.json';

const TextSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearchClicked, setIsSearchClicked] = useState(false);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        const results = data.filter((item) => item.text.toLowerCase().includes(searchTerm.toLowerCase()));
        setSearchResults(results);
        setIsSearchClicked(true);
    };

    // Render all data if searchTerm is empty, otherwise render searchResults
    const renderData = searchTerm === '' ? data : searchResults;
    const searchResultsCount = searchResults.length;

    return (
        <div className='pt-36 px-12'>
            <h1 className='px-12'>Search App</h1>
            <input type="text" value={searchTerm} onChange={handleInputChange} />
            <button onClick={handleSearch}>Search</button>
            {searchTerm !== '' && isSearchClicked && (
                <p>{searchResultsCount} result(s) found</p>
            )}
            <ul>
                {renderData.map((item) => (
                    <li key={item.id} className='list-disc ml-6 '>{highlightText(item.text, searchTerm, isSearchClicked)}</li>
                ))}
            </ul>
        </div>
    );
};

const highlightText = (text, searchTerm, isSearchClicked) => {
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    return (
        <span>
            {parts.map((part, index) => (
                regex.test(part) ? (
                    <span key={index} className={isSearchClicked ? 'bg-yellow-500' : ''}>{part}</span>
                ) : (
                    <span key={index}>{part}</span>
                )
            ))}
        </span>
    );
};

export default TextSearch;
