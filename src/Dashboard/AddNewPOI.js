import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Form, Button } from "react-bootstrap";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from '../FirebaseInit';
import { onValue ,ref as dbRef, set, child } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

mapboxgl.accessToken = 'pk.eyJ1IjoiZW5zY2hlZGVleHBsb3JlciIsImEiOiJjbG5zbmE2MW4wMmpsMmlwNDhidTFhODJrIn0.lySYDDeknDw5W2LbAuTc-Q';

function AddNewPOI() {

  //#region Mapbox
  const mapContainerRef = useRef(null);
  const markerRef = useRef(null);
  const mapRef = useRef(null);
  const [clickedCoordinates, setClickedCoordinates] = useState(null);


  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [6.8959, 52.2206],
      zoom: 12
    });

    mapRef.current = map;

    return () => map.remove();
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      const coordinates = e.lngLat || e.originalEvent.lngLat;
      setClickedCoordinates(coordinates);
      
      if (!markerRef.current) {
        markerRef.current = new mapboxgl.Marker({
          color: '#ff0000'
        }).setLngLat(coordinates)
          .addTo(mapRef.current);
      } else {
        markerRef.current.setLngLat(coordinates);
      }
    };

    mapRef.current.on('click', handleClick);
  }, []);

  //#endregion

  const navigate = useNavigate();

  const refPoi = dbRef(db, '/POIs');
  let highestPoiID = -Infinity; 

  const fetchData = () => {
    onValue(refPoi, (snapshot) => {
      const poiList = snapshot.val();
      highestPoiID = Object.values(poiList).reduce((maxId, poi) => {
        return poi.PoiID > maxId ? poi.PoiID : maxId;
      }, -Infinity);

      //console.log(highestPoiID);
      });
    }
  
  fetchData();

  const submitData = () => {
    const POIID = highestPoiID + 1;
    //console.log(POIID);

    const POIName = document.getElementById('POIName').value;
    //console.log(POIName);

    const POIType = parseInt(document.getElementById('POIType').value, 10);
    //console.log(POIType);

    var POILocation
    if (clickedCoordinates !== null) {
      const {lng, lat} = clickedCoordinates;
      const coordinatesString = lat.toString() + ", " + lng.toString();
      POILocation = coordinatesString;
      //console.log("Clicked Coordinates:", coordinatesString);
    } else {
      console.log('No location set')
    };

    const POIImage = document.getElementById('POIImage');
    var POIImageName
    if (POIImage.files.length !== 0) {
      POIImageName = POIImage.files[0].name;
      console.log('Images/' + POIImageName);
  
      const storage = getStorage();
      const storageRef = ref(storage, 'Images/' + POIImageName)
  
      uploadBytes(storageRef, POIImage.files[0]).then((snapshot)=> {
        //console.log('Uploaded an image ');
      })
    } else {
      console.log('No image given')
    }

    const POIDescription = document.getElementById('POIDescription').value;
    //console.log(POIDescription);

    const newPOI = {
      Description: POIDescription,
      ImageLocation: 'Images/' + POIImageName,
      Location: POILocation,
      PoiID: POIID,
      PoiName: POIName,
      PoiType: POIType
    }

    //console.log(newPOI);
     
    const poiRef = dbRef(db, '/POIs');
    const poiName = newPOI.PoiName;

    const parentRef = child(poiRef, poiName);
    set(parentRef, newPOI)
      .then(() => {
        console.log('New POI added successfully');
        navigate(`/Data-Dashboard/POIs/${POIName}`)
      })
      .catch((error) => {
        console.error('Error adding new POI: ', error);
    });
  };

  return (
    <>
      <Form onSubmit={submitData}>
        <Form.Group>
          <Form.Label>POI Name</Form.Label>
          <Form.Control
            type='text'
            id='POIName'
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>POI Type</Form.Label>
          <Form.Select                         
            id='POIType'
          >
            <option value={0}>General</option>
            <option value={1}>History</option>
            <option value={2}>Leisure</option>
          </Form.Select>
        </Form.Group>

        <Form.Group>
          <Form.Label>POI Image</Form.Label>
          <Form.Control
            type='file'
            id='POIImage'n
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>POI Location</Form.Label>
          <div ref={mapContainerRef} style={{ width: '100%', height: '600px' }} />
        </Form.Group>

        <Form.Group>
          <Form.Label>POI Description</Form.Label>
          <textarea 
            className="form-control" 
            id='POIDescription'
          >
          </textarea>
        </Form.Group>


        <Button 
          className="mt-2"
          type='button'
          onClick={submitData}
        >
          Submit
        </Button>
      </Form>
    </>
  )
}

export default AddNewPOI;