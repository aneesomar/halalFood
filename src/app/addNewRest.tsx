"use client";

import React, { useState } from 'react';
import axios from 'axios';
import '../app/globals.css';
import { getCoordinates } from './page';

export default function AddNewRest() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [distance, setDistance] = useState('');
    const [reviews, setReviews] = useState('');
    const [image, setImage] = useState('');
    const [rating, setRating] = useState('');
    const [address, setAddress] = useState('');
    const [lat, setLat] = useState<number | null>(null);
    const [lng, setLng] = useState<number | null>(null);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const coordinates = await getCoordinates(address);
            setLat(coordinates.lat);
            setLng(coordinates.lng);

            const response = await axios.post('/api/restaurants', {
                name,
                description,
                reviews: parseInt(reviews),
                image,
                rating: parseInt(rating),
                address,
                coords: {
                    lat: coordinates.lat,
                    lng: coordinates.lng
                }
            });
            setMessage('Restaurant added successfully!');
        } catch (error) {
            setMessage('Failed to add restaurant.');
            console.error('Error adding restaurant:', error);
        }
    };

    return (
        <div className="p-8 space-y-4">
            <h1 className="title">Add New Restaurant</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Reviews"
                    value={reviews}
                    onChange={(e) => setReviews(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Latitude"
                    value={lat !== null ? lat.toString() : ''}
                    readOnly
                />
                <input
                    type="text"
                    placeholder="Longitude"
                    value={lng !== null ? lng.toString() : ''}
                    readOnly
                />
                <button type="submit">Add Restaurant</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}