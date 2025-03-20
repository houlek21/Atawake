import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Slider from "./components/Slider";
import RedBanner from "./components/RedBanner";
import LocalArtists from "./components/LocalArtists";
import PopularItems from "./components/PopularItems";
import MarketSection from "./components/MarketSection";
import ProductPage from "./pages/ProductPage";
import ArtistPage from "./pages/ArtistPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <Slider />
            <RedBanner />
            <LocalArtists />
            <PopularItems />
            <MarketSection />
          </>
        } />
        <Route path="/artist/:seller/product/:productName" element={<ProductPage />} />
        <Route path="/artist/:seller" element={<ArtistPage />} /> {/* NEW ROUTE */}
      </Routes>
    </Router>
  );
}

export default App;
