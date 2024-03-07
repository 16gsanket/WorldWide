import { BrowserRouter, Routes, Route } from "react-router-dom";

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import Pagenotfound from "./pages/Pagenotfound";
import Pagelayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import { useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000";

function App() {
  const [cities, setCities] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchcities() {
      try {
        setIsLoading(true);
        let res = await fetch(`${BASE_URL}/cities`);
        let data = await res.json();

        setCities((citydata) => (citydata = data));
        console.log(data);
      } catch (err) {
        console.log("error in fetching data");
      } finally {
        setIsLoading(false);
      }
    }

    fetchcities();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="pagelayout" element={<Pagelayout />}>
          <Route index element={<CityList cities={cities} IsLoading={IsLoading}/>} />
          <Route path="cities" element={<CityList cities={cities} IsLoading={IsLoading}/>} />
          <Route path="country" element={<p>Countries</p>} />
          <Route path="form" element={<p>Form</p>} />
        </Route>
        <Route path="*" element={<Pagenotfound />} />

        <Route />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
