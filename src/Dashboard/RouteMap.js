import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from 'react-bootstrap';
import { db } from '../FirebaseInit';
import { get, ref } from 'firebase/database';

function RouteMap({ PoiList }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  const [editMap, setEditMap] = useState(false);
  const [poiArray, setPoiArray] = useState([]);

  mapboxgl.accessToken = 'pk.eyJ1IjoiZW5zY2hlZGVleHBsb3JlciIsImEiOiJjbG5zbmE2MW4wMmpsMmlwNDhidTFhODJrIn0.lySYDDeknDw5W2LbAuTc-Q';
  
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      //style: 'mapbox://styles/enschedeexplorer3/clucdyog1006001qq832dc8a6',
      center: [6.8959, 52.2206],
      zoom: 16
    });

    mapRef.current = map;

    return () => map.remove();
  }, []);

  useEffect(() => {
    if (PoiList) {
      const poiArray = PoiList.split(',').map(poi => poi.trim());
      setPoiArray(poiArray);
    }
  }, [PoiList]);

  return (
    <>
      <Button
        variant="secondary"
        className="mb-2 ms-5 text-custom"
        onClick={() => {
          if (editMap) {
            // Handle save logic here
          }
          setEditMap(!editMap);
        }}
      >
        {editMap ? "Save" : "Edit"}
      </Button>
      <div className='px-5'>
        <div ref={mapContainerRef} style={{ width: '100%', height: '600px' }} />
      </div>
    </>
  );
};

export default RouteMap;
