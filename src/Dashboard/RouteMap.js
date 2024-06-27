import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import 'mapbox-gl/dist/mapbox-gl.css';
import { db } from '../FirebaseInit';
import { ref, onValue } from 'firebase/database';

function RouteMap({ PoiList }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  //const [editMap, setEditMap] = useState(false);
  const [poiArray, setPoiArray] = useState([]);
  const [poiData, setPoiData] = useState([]);

  mapboxgl.accessToken = 'pk.eyJ1IjoiZW5zY2hlZGVleHBsb3JlciIsImEiOiJjbG5zbmE2MW4wMmpsMmlwNDhidTFhODJrIn0.lySYDDeknDw5W2LbAuTc-Q';
  
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      //style: 'mapbox://styles/mapbox/streets-v12',
      style: 'mapbox://styles/enschedeexplorer3/cluic42wf018z01pr4rbybhye',
      center: [6.8959, 52.2206],
      zoom: 13
    });

    mapRef.current = map;

    // Add event listener for 'style.load'
    map.on('style.load', () => {
      if (PoiList) {
        const poiArray = PoiList.split(',').map(poi => poi.trim());
        setPoiArray(poiArray);
      }

      const dbRefPoi = ref(db, 'POIs/');
      onValue(dbRefPoi, (snapshot) => {
        setPoiData(snapshot.val());
      });
    });

    return () => map.remove();
  }, [PoiList]);

  useEffect(() => {
    if (Object.keys(poiData).length === 0 || poiArray.length === 0) return;

    const markers = [];
  
    // Convert poiData object into an array of values
    const poiDataArray = Object.values(poiData);
  
    // Iterate through poiArray to ensure the order
    for (const poiID of poiArray) {
      // Find the corresponding poiData object in poiDataArray
      const poi = poiDataArray.find(poi => poi.PoiID.toString() === poiID);
  
      if (poi) {
        const locationString = poi.Location;
        const [lon, lat] = locationString.split(',').map(coord => parseFloat(coord));
  
        const marker = new mapboxgl.Marker()
          .setLngLat([lat, lon])
          .addTo(mapRef.current);
        markers.push(marker);
      }
    }
  
    // Draw lines between markers
    for (let i = 0; i < markers.length - 1; i++) {
      const startLngLat = markers[i].getLngLat();
      const endLngLat = markers[i + 1].getLngLat();
      new mapboxgl.Marker({ color: 'red' })
        .setLngLat(startLngLat)
        .addTo(mapRef.current);
      mapRef.current.addLayer({
        id: `line-${i}`,
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: [
                [startLngLat.lng, startLngLat.lat],
                [endLngLat.lng, endLngLat.lat],
              ],
            },
          },
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': 'red',
          'line-width': 2,
        },
      });
    }
  }, [poiData, poiArray]);

  return (
    <>
      <div className='px-5'>
        <div ref={mapContainerRef} style={{ width: '100%', height: '600px' }} />
      </div>
    </>
  );
}

export default RouteMap;
