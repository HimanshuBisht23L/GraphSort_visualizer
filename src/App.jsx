import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import ProjectPage from "./components/ProjectPage.jsx";

function Project(){
  return (
    <>
      <ProjectPage/>
    </>
  )
}

function App()  {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Project />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
