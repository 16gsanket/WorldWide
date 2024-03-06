import { BrowserRouter, Routes, Route } from "react-router-dom";

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage"
import Pagenotfound from "./pages/PageNotFound"
import Pagelayout from "./pages/AppLayout"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />}/>
        <Route path="pagelayout" element={<Pagelayout/>} />
        <Route path="*" element={<Pagenotfound />}/> 

        <Route/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
