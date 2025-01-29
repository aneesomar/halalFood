'use client'; // Marks this component as a Client Component


import React, { useState } from 'react';
import Tile from '../components/Tile';
import '../app/globals.css';
import axios from 'axios';
import OpenStreetMap from '../components/OpenStreetMap';
import restaurants from '../data/rest.json';
import Search from '../components/Search';

const GEOCODING_API_KEY = 'c776efbac3664c868c5f3d79eda72ad3'; // Replace with your OpenCage API key

interface Coordinates {
    lat: number;
    lng: number;
}

export async function getCoordinates(address: string): Promise<Coordinates> {
    const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${GEOCODING_API_KEY}`);
    const { lat, lng } = response.data.results[0].geometry;
    return { lat, lng };
}

export default function Home() {
    const [mapCoordinates, setMapCoordinates] = useState<Coordinates>({ lat: -33.9221, lng: 18.4231 });

    const handleAddressSubmit = async (address: string) => {
        try {
            const coordinates = await getCoordinates(address);
            setMapCoordinates(coordinates);
        } catch (error) {
            console.error('Error getting coordinates:', error);
        }
    };

    //sort restaurants by distance
    const sortedRestaurants = restaurants.sort((a, b) => (b.rating / b.distance) - (a.rating / a.distance));
    const addresses = restaurants.map(restaurant => restaurant.address);

    return (
        <div className="p-8 space-y-4">
            <h1 className='title'>Rest Halaal</h1>
            <Search onSubmit={handleAddressSubmit} />
            <OpenStreetMap latitude={mapCoordinates.lat} longitude={mapCoordinates.lng} addresses={addresses} />
            {sortedRestaurants.map((restaurant, index) => (
                <Tile
                    key={index}
                    name={restaurant.name}
                    description={restaurant.description}
                    distance={restaurant.distance}
                    reviews={restaurant.reviews}
                    image={restaurant.image}
                    rating={restaurant.rating}
                />
            ))}
        </div>
    );
}