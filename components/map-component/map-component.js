import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import classes from './map-component.module.css';

mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

const MapComponent = () => {
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: 'map', // ID del contenitore
            style: 'mapbox://styles/mapbox/streets-v11', // Stile della mappa
            center: [12.4964, 41.9028], // Posizione iniziale [longitudine, latitudine]
            zoom: 12 // Livello di zoom iniziale
        });

        new mapboxgl.Marker()
            .setLngLat([12.4964, 41.9028]) // Posizione del marker [longitudine, latitudine]
            .addTo(map);

    }, []);

    return (
        <div className={classes.mappa} id="map" style={{ width: '100%', height: '400px' }}>
        </div>
    );
};

export default MapComponent;