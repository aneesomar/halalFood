"use client";


import React, { useState, useEffect } from 'react';
import Tile from '../components/Tile';
import '../app/globals.css';
import axios from 'axios';
import OpenStreetMap from '../components/OpenStreetMap';
import Search from '../components/Search';
import clientPromise from '@/lib/api/mongodb';

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

export const haversineDistance = (coords1: { lat: number, lng: number }, coords2: { lat: number, lng: number }) => {
    const toRad = (value: number) => (value * Math.PI) / 180;

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRad(coords2.lat - coords1.lat);
    const dLon = toRad(coords2.lng - coords1.lng);
    const lat1 = toRad(coords1.lat);
    const lat2 = toRad(coords2.lat);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in kilometers
};

export default function Home() {
    const [mapCoordinates, setMapCoordinates] = useState<Coordinates>({ lat: -33.9221, lng: 18.4231 });
    interface Restaurant {
        name: string;
        description: string;
        coords: Coordinates;
        reviews: string[];
        image: string;
        rating: number;
    }

    const [sortedRestaurants, setSortedRestaurants] = useState<Restaurant[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/restaurants');
                setSortedRestaurants(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleAddressSubmit = async (address: string) => {
        try {
            const coordinates = await getCoordinates(address);
            setMapCoordinates(coordinates);

            // Sort restaurants by distance
            const sorted = [...sortedRestaurants].sort((a, b) => {
                const distanceA = haversineDistance(coordinates, a.coords);
                const distanceB = haversineDistance(coordinates, b.coords);
                return distanceA - distanceB;
            });
            setSortedRestaurants(sorted);
        } catch (error) {
            console.error('Error getting coordinates:', error);
        }
    };

    const coordinates = sortedRestaurants.map(restaurant => restaurant.coords);

    return (
        <div className="p-8 space-y-4">
            <h1 className='title'>Rest Halaal</h1>
            <Search onSubmit={handleAddressSubmit} />
            <OpenStreetMap latitude={mapCoordinates.lat} longitude={mapCoordinates.lng} coordinates={coordinates} />
            {sortedRestaurants.map((restaurant, index) => {
                const distance = haversineDistance(
                    mapCoordinates,
                    restaurant.coords
                );
                return (
                    <Tile
                        key={index}
                        name={restaurant.name}
                        description={restaurant.description}
                        distance={distance.toFixed(2)} // Display distance in kilometers with 2 decimal places
                        reviews={restaurant.reviews}
                        image={restaurant.image}
                        rating={restaurant.rating}
                    />
                );
            })}
        </div>
    );
}