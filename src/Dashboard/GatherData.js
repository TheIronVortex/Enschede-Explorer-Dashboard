import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import db from "../FirebaseInit";

function GetData() {
  const { ParentKey, ValueName } = useParams(); 
  const [parentKeys, setParentKeys] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    const POIDataRef = ref(db, `${ParentKey}/${ValueName}`);
    const unsubscribe = onValue(POIDataRef, (snapshot) => {
      const fetchedData = snapshot.exists() ? snapshot.val() : {};
      const keys = Object.keys(fetchedData);
      setParentKeys(keys);
      setData(fetchedData);
    }, (error) => {
      console.error("Error fetching data:", error);
    });

    return () => {
      unsubscribe();
    };
  }, [ParentKey, ValueName]); 

  return { parentKeys, data, ValueName};
}

export default GetData;
