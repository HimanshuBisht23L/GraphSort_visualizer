import { BrowserRouter, Routes, Route } from "react-router";
import Graphviso from "./components/GraphViso.jsx";
import Testpage from "./components/Testpage.jsx";
import SortingViso from "./components/SortingViso.jsx";
import Home from "./components/Home.jsx";
import Footer from "./components/Footer.jsx";
import Navebar from "./components/Navebar.jsx";
import './styles/App.css'

function GraphViso() {
  return (
    <>
      <Graphviso />
    </>
  )
}

function TestPage() {
  return (
    <>
      <Navebar />
      <Testpage />
      <Footer />
    </>
  )
}

function Sortingviso() {
  return (
    <>
      <SortingViso />
    </>
  )
}

function HomePage() {
  return (
    <>
      <Navebar />
      <Home />
      <Footer />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Test" element={<TestPage />} />
        <Route path="/Graph" element={<GraphViso />} />
        <Route path="/Sorting" element={<Sortingviso />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
