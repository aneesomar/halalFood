'use client'; // Marks this component as a Client Component
import React, { useEffect, useState } from 'react';

const Search = ({ }) => {
    const [address, setAddress] = useState('');

    const handleInputChange = (event) => {
        setAddress(event.target.value);
    };

    const handleSubmit = () => {
        // You can handle the submission logic here
        console.log('Address submitted:', address);
    };

    return (
        <div>
            <input
                type="text"
                value={address}
                onChange={handleInputChange}
                placeholder="Type an address"
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default Search;