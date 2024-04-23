import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFoundPage from "./NotFoundPage";
import HomePage from "./HomePage";
import SpecificDataPage from "./Dashboard/SpecificDataPage";
import DataOverview from "./Dashboard/DataOverview";
import OwnershipData from "./Dashboard/OwnershipData";
import MapOverview from "./MapOverview";
import Customize from "./Customize/Customize";
import AddNewData from "./Dashboard/AddNewData";
import DashboardData from "./Dashboard/DashboardData";
import "./Customize/style.css";
import Login from "./LoginPage";
import CustomNavbar from './Navbar/Navbar';
import { auth } from './FirebaseInit';
import Documentation from "./Documentation/Documentation";
//import { get, ref } from "firebase/database";

function Main() {
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedTextColor, setSelectedTextColor] = useState('');
  // eslint-disable-next-line
  const [user, setUser] = useState(null);
  //const [loading, setLoading] = useState(true);
  //const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setSelectedColor(localStorage.getItem('selectedColorPrimary'));
    setSelectedTextColor(localStorage.getItem('selectedTextColor'));
    /*
    if (user) {
      get(ref(db, `Users/${user.displayName}`))
        .then(snapshot => {
          const userData = snapshot.val();
          setIsAdmin(userData && userData.Admin === true);
        })
        .catch(error => {
          console.error("Error getting user data from Realtime Database:", error);
        });
    } else {
      setLoading(false)
    }
    */
  }, []);
/*
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !isAdmin) {
    return (
      <Router>
        <Login selectedColor={selectedColor} selectedTextColor={selectedTextColor} />
      </Router>
    )
  }
*/
  return (
    <>
      <CustomNavbar selectedColor={selectedColor} selectedTextColor={selectedTextColor}/>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<Login selectedColor={selectedColor} selectedTextColor={selectedTextColor} />} />
          <Route path="/Map" element={<MapOverview />} />
          <Route path="/Documentation" element={<Documentation />} />
          <Route path="/Data-Dashboard"> 
            <Route index element={<DashboardData selectedColor={selectedColor} selectedTextColor={selectedTextColor} />} />
            <Route path=":ParentKey" element={<SpecificDataPage selectedColor={selectedColor} selectedTextColor={selectedTextColor} />} />
            <Route path=":ParentKey/New" element={<AddNewData selectedColor={selectedColor} selectedTextColor={selectedTextColor} />} />
            <Route path=":ParentKey/:ValueName" element={<DataOverview selectedColor={selectedColor} selectedTextColor={selectedTextColor}/> } />
            <Route path=":ParentKey/:ValueName/Ownership" element={<OwnershipData selectedColor={selectedColor} selectedTextColor={selectedTextColor}/>} />
          </Route>
          <Route path="/Customize" element={<Customize setSelectedColor={setSelectedColor} setSelectedTextColor={setSelectedTextColor} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default Main;
