import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ref, onValue } from 'firebase/database';
import db from './FirebaseInit';

function MapOverview() {
  const mapContainerRef = useRef(null);
  const [poiLocations, setPoiLocations] = useState([]);

  mapboxgl.accessToken = 'pk.eyJ1IjoiZW5zY2hlZGVleHBsb3JlciIsImEiOiJjbG5zbmE2MW4wMmpsMmlwNDhidTFhODJrIn0.lySYDDeknDw5W2LbAuTc-Q';

  useEffect(() => {
    const fetchData = () => {
      const poiRef = ref(db, 'POIs');
      onValue(poiRef, (snapshot) => {
        const poiData = snapshot.val();
        const locations = Object.values(poiData).map(poi => {
          const { Location } = poi;
          const [lat, lng] = Location.split(',').map(parseFloat);
          return { lng, lat };
        });
        setPoiLocations(locations);
      });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [6.8965, 52.2200],
      zoom: 12
    });

    poiLocations.forEach(location => {
      new mapboxgl.Marker()
        .setLngLat(location)
        .addTo(map);
    });

    return () => {
      map.remove();
    };
  }, [poiLocations]);

  return (
    <div className='p-2'>
      <h1>POI location overview:</h1>
      <div ref={mapContainerRef} style={{ width: '100%', height: '800px' }} />
    </div>
  );
}

export default MapOverview;
