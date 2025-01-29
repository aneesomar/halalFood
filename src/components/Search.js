'use client'; // Marks this component as a Client Component
import React, { useState } from 'react';

const Search = ({ onSubmit }) => {
    const [address, setAddress] = useState('');

    const handleInputChange = (event) => {
        setAddress(event.target.value);
    };

    const handleSubmit = async () => {
        console.log('Address submitted:', address);
        onSubmit(address);
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