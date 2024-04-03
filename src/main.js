import React, { useEffect, useState } from "react";
import DashboardData from "./Dashboard/DashboardData";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFoundPage from "./NotFoundPage";
import HomePage from "./HomePage";
import SpecificDataPage from "./Dashboard/SpecificDataPage";
import DataOverview from "./Dashboard/DataOverview";
import OwnershipData from "./Dashboard/OwnershipData";
import MapOverview from "./MapOverview";
import Customize from "./Customize/Customize";
import "./Customize/style.css";

function Main() {
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedTextColor, setSelectedTextColor] = useState('');
  
  useEffect(() => {
    setSelectedColor(localStorage.getItem('selectedColorPrimary'));
    setSelectedTextColor(localStorage.getItem('selectedTextColor'));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Map" element={<MapOverview />} />
        <Route path="/Data-Dashboard"> 
          <Route index element={<DashboardData />} />
          <Route path=":ParentKey" element={<SpecificDataPage />} />
          <Route path=":ParentKey/:ValueName" element={<DataOverview selectedColor={selectedColor} selectedTextColor={selectedTextColor}/> } />
          <Route path=":ParentKey/:ValueName/Ownership" element={<OwnershipData selectedColor={selectedColor} selectedTextColor={selectedTextColor}/>} />
        </Route>
        <Route path="/Customize" element={<Customize setSelectedColor={setSelectedColor} setSelectedTextColor={setSelectedTextColor} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default Main;
