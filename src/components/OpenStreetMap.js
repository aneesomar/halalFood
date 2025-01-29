'use client'; // Marks this component as a Client Component
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

const OpenStreetMap = ({ latitude, longitude, coordinates }) => {
    const [mapInstance, setMapInstance] = useState(null);
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        let map;
        import('leaflet')
            .then(L => {
                delete L.Icon.Default.prototype._getIconUrl;

                L.Icon.Default.mergeOptions({
                    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
                    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                });
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

    useEffect(() => {
        if (mapInstance) {
            mapInstance.setView([latitude, longitude], 13);
            markers.forEach(marker => marker.remove());
            const newMarkers = coordinates.map(coord => L.marker([coord.lat, coord.lng]).addTo(mapInstance));
            setMarkers(newMarkers);
        }
    }, [latitude, longitude, coordinates, mapInstance]);

    return (
        <div>
            <div id="map" style={{ width: '100%', height: '400px' }}></div>
            {!mapInstance && <div>Loading...</div>}
        </div>
    );
};

// Dynamically import the component and disable SSR
export default dynamic(() => Promise.resolve(OpenStreetMap), { ssr: false });