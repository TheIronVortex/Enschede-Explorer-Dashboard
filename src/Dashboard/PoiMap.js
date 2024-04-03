import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from 'react-bootstrap';

function Map({ customStartLocation, onLocationChange, locationSave}) {
  const mapContainerRef = useRef(null);
  const markerRef = useRef(null);
  const mapRef = useRef(null);

  const [editMap, setEditMap] = useState(false);

  mapboxgl.accessToken = 'pk.eyJ1IjoiZW5zY2hlZGVleHBsb3JlciIsImEiOiJjbG5zbmE2MW4wMmpsMmlwNDhidTFhODJrIn0.lySYDDeknDw5W2LbAuTc-Q';
  
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      //style: 'mapbox://styles/enschedeexplorer3/clucdyog1006001qq832dc8a6',
      center: customStartLocation || [6.8959, 52.2206],
      zoom: 16
    });

    mapRef.current = map;

    if (customStartLocation) {
      if (!markerRef.current) {
        markerRef.current = new mapboxgl.Marker({
          color: '#ff0000' // You can customize the marker color here
        }).setLngLat(customStartLocation)
          .addTo(map);
      } else {
        markerRef.current.setLngLat(customStartLocation);
      }
    }
    
    map.on('load', () => {
      if (customStartLocation) {
        markerRef.current.setLngLat(customStartLocation);
      }
    });


    return () => map.remove();
  }, [customStartLocation]);

  useEffect(() => {
    const handleClick = (e) => {
      //console.log("Click Detected");
      //console.log("editableFields: " + editMap);
  
      if (editMap) {
        const coordinates = e.lngLat || e.originalEvent.lngLat; // Resolve lngLat properly
  
        // Update marker position
        if (!markerRef.current) {
          markerRef.current = new mapboxgl.Marker({
            color: '#ff0000'
          }).setLngLat(coordinates)
            .addTo(mapRef.current);
        } else {
          markerRef.current.setLngLat(coordinates);
        }
  
        onLocationChange([coordinates.lng, coordinates.lat]);
      }
    };
  
    mapRef.current.on('click', handleClick);
  });

  return (
    <>
      <Button
        variant="secondary"
        className="mb-2 ms-5 text-custom"
        onClick={() => {
          if (editMap) {
            locationSave();
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

export default Map;
