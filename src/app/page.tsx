import React from 'react';
import Tile from '../components/Tile';
import '../app/globals.css';
import OpenStreetMap from '../components/OpenStreetMap';
import restaurants from '../data/rest.json';



export default function Home() {
    //sort restaurants by distance
    const sortedRestaurants = restaurants.sort((a, b) => (b.rating / b.distance) - (a.rating / a.distance));

    return (
        <div className="p-8 space-y-4">
            <h1 className='title'>Rest Halaal</h1>
            <OpenStreetMap />
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


