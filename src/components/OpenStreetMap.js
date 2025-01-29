'use client'; // Marks this component as a Client Component
import dynamic from 'next/dynamic';
import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

const OpenStreetMap = ({ latitude, longitude, addresses }) => {
    const [mapInstance, setMapInstance] = useState(null);
    const addressList = addresses;

    useEffect(() => {
        let map;
        import('leaflet')
            .then(L => {
                map = L.map('map').setView([latitude, longitude], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);
                setMapInstance(map);
            })
            .catch(error => {
                console.error('Error loading Leaflet:', error);
            });

        // Cleanup function
        return () => {
            if (map) {
                map.remove();
            }
        };
    }, []);

    return (
        <div>
            <div id="map" style={{ width: '100%', height: '400px' }}></div>
            {!mapInstance && <div>Loading...</div>}
        </div>
    );
};

// Dynamically import the component and disable SSR
export default dynamic(() => Promise.resolve(OpenStreetMap), { ssr: false });
