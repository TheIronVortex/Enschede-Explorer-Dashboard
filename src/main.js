import React, { useState } from "react";
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
  const [selectedColor, setSelectedColor] = useState('#e20d18'); // Initial color
 
  console.log(selectedColor)
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Map" element={<MapOverview />} />
        <Route path="/Data-Dashboard"> 
          <Route index element={<DashboardData />} />
          <Route path=":ParentKey" element={<SpecificDataPage />} />
          <Route path=":ParentKey/:ValueName" element={<DataOverview selectedColor={selectedColor}/>} />
          <Route path=":ParentKey/:ValueName/Ownership" element={<OwnershipData selectedColor={selectedColor}/>} />
        </Route>
        <Route path="/Customize" element={<Customize selectedColor={selectedColor} setSelectedColor={setSelectedColor} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default Main;
