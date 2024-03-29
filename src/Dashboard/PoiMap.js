import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from 'react-bootstrap';

function Map({ customLocation, onLocationChange, locationSave}) {
  const mapContainerRef = useRef(null);
  const markerRef = useRef(null);
  const mapRef = useRef(null);

  const [editMap, setEditMap] = useState(false);

  mapboxgl.accessToken = 'pk.eyJ1IjoiZW5zY2hlZGVleHBsb3JlciIsImEiOiJjbG5zbmE2MW4wMmpsMmlwNDhidTFhODJrIn0.lySYDDeknDw5W2LbAuTc-Q';
  
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      //style: 'mapbox://styles/enschedeexplorer3/club01n9h00wu01pr71qo9ovr',
      center: customLocation || [6.8959, 52.2206],
      zoom: 16
    });

    mapRef.current = map;

    if (customLocation) {
      if (!markerRef.current) {
        markerRef.current = new mapboxgl.Marker({
          color: '#ff0000' // You can customize the marker color here
        }).setLngLat(customLocation)
          .addTo(map);
      } else {
        markerRef.current.setLngLat(customLocation);
      }
    }
    
    map.on('load', () => {
      if (customLocation) {
        markerRef.current.setLngLat(customLocation);
      }
    });


    return () => map.remove();
  }, [customLocation]);

  useEffect(() => {
    const handleClick = (e) => {
      console.log("Click Detected");
      console.log("editableFields: " + editMap);
  
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
  
    return () => {
      mapRef.current.off('click', handleClick); // Remove the event listener
    };
  }, [editMap]);
  

  // Update map when customLocation changes
  useEffect(() => {
    if (mapRef.current && customLocation) {
      mapRef.current.setCenter(customLocation);
      if (!markerRef.current) {
        markerRef.current = new mapboxgl.Marker({
          color: '#ff0000' // You can customize the marker color here
        }).setLngLat(customLocation)
          .addTo(mapRef.current);
      } else {
        markerRef.current.setLngLat(customLocation);
      }
    }
  }, [customLocation]);

  return (
    <>
      <Button
        variant="secondary"
        className="mb-2 ms-5"
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
