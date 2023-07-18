import { Route, Routes, Navigate, } from "react-router-dom";
import React, { useEffect, useState, createContext } from "react";
import axios from "axios";
import Nav from "./Components/Nav";
import DataIntake from "./Components/DataIntake";
import DataValidation from "./Components/DataValidation";
import RuleProcessing from "./Components/RuleProcessing";
import ClearAlerts from "./Components/ClearAlerts";
import Home from "./Components/Home"
import MyContext from "./Context/MyContext";
import { DataContext } from "./Context/DataContext";

function App() {
  const [selectedTenant, setSelectedTenant] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios([axios.get("http://localhost:3000/tenantList")])
      .then((response) => {
        console.log("response", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <DataContext.Provider value={{ data }}>
        <MyContext.Provider value={{ selectedTenant, setSelectedTenant }}>
          <Nav />
          <Routes>
            <Route path="/DataIntake" element={<DataIntake />} />
            <Route path="/DataValidation" element={<DataValidation />} />
            <Route path="/RuleProcessing" element={<RuleProcessing />} />
            <Route path="/ClearAlerts" element={<ClearAlerts />} />
            <Route path="/" element={<Home/>}/>
          </Routes>
        </MyContext.Provider>
      </DataContext.Provider>
    </div>
  );
}
export default App;
