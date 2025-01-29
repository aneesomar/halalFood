
import React from 'react';
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
    //sort restaurants by distance
    const sortedRestaurants = restaurants.sort((a, b) => (b.rating / b.distance) - (a.rating / a.distance));
    const addresses = restaurants.map(restaurant => restaurant.address);
    getCoordinates(addresses[0]).then(console.log);



    return (
        <div className="p-8 space-y-4">
            <h1 className='title'>Rest Halaal</h1>
            <Search></Search>
            <OpenStreetMap latitude={-33.9221} longitude={18.4231} addresses={addresses} />
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
};



