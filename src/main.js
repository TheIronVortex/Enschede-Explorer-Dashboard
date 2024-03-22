import DashboardData from "./Dashboard/DashboardData";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFoundPage from "./NotFoundPage";
import TestPage from "./Test/TestPage";
import HomePage from "./HomePage";
import SpecificDataPage from "./Dashboard/SpecificDataPage";
import DataOverview from "./Dashboard/DataOverview";

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Test" element={<TestPage />} />
        <Route path="/Data-Dashboard"> 
          <Route index element={<DashboardData />} />
          <Route path=":ParentKey" element={<SpecificDataPage/>} />
          <Route path=":ParentKey/:ValueName" element={<DataOverview />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>

  );
}

export default Main;
