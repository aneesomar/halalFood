'use client'; // Marks this component as a Client Component
import React, { useEffect, useState } from 'react';
import { getCoordinates } from '@/app/page';

const Search = ({ }) => {
    const [address, setAddress] = useState('');

    const handleInputChange = (event) => {
        setAddress(event.target.value);
    };

    const handleSubmit = async () => {
        // You can handle the submission logic here
        console.log('Address submitted:', address);
        try {
            const coordinates = await getCoordinates(address);
            console.log('Coordinates:', coordinates);
        } catch (error) {
            console.error('Error getting coordinates:', error);
        }
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