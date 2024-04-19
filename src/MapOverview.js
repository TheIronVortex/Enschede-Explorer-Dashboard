import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ref, onValue } from 'firebase/database';
import {db} from './FirebaseInit';
import { useNavigate } from 'react-router-dom';

function MapOverview() {
  const mapContainerRef = useRef(null);
  const [poiLocations, setPoiLocations] = useState([]);
  const navigate = useNavigate();

  mapboxgl.accessToken = 'pk.eyJ1IjoiZW5zY2hlZGVleHBsb3JlciIsImEiOiJjbG5zbmE2MW4wMmpsMmlwNDhidTFhODJrIn0.lySYDDeknDw5W2LbAuTc-Q';

  useEffect(() => {
    const fetchData = () => {
      const poiRef = ref(db, 'POIs');
      onValue(poiRef, (snapshot) => {
        const poiData = snapshot.val();
        const locations = Object.values(poiData).map(poi => {
          const { Location , PoiName } = poi;
          const [lat, lng] = Location.split(',').map(parseFloat);
          return { lng, lat, name: PoiName };
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
      const marker = new mapboxgl.Marker()
        .setLngLat(location)
        .addTo(map);

      const popup = new mapboxgl.Popup({
        offset: 25
      }).setText(location.name);

      marker.setPopup(popup);

      marker.getElement().addEventListener('mouseenter', () => {
        marker.togglePopup();
      });

      marker.getElement().addEventListener('mouseleave', () => {
        marker.togglePopup();
      });

      marker.getElement().addEventListener('click', () => {
        navigate(`/Data-Dashboard/POIs/${location.name}`)
        console.log('Navigate to POI page:', location.name);
      });
    });
    
    return () => {
      map.remove();
    };
  }, [poiLocations, navigate]);

  return (
    <div className='p-2'>
      <h1>POI location overview:</h1>
      <div ref={mapContainerRef} style={{ width: '100%', height: '800px' }} />
    </div>
  );
}

export default MapOverview;
