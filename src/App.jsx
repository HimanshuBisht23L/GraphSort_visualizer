import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Graphviso from "./components/GraphViso.jsx";
import Homepage from "./components/Homepage.jsx";
import SortingViso from "./components/SortingViso.jsx";

function GraphViso(){
  return (
    <>
      <Graphviso/>
    </>
  )
}

function HomePage(){
  return (
    <>
      <Homepage/>
    </>
  )
}

function Sortingviso(){
  return (
    <>
      <SortingViso/>
    </>
  )
}

function App()  {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Graph" element={<GraphViso />} />
        <Route path="/Sorting" element={<Sortingviso />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
