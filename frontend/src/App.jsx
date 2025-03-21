import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Slider from "./components/Slider";
import RedBanner from "./components/RedBanner";
import LocalArtists from "./components/LocalArtists";
import PopularItems from "./components/PopularItems";
import MarketSection from "./components/MarketSection";
import ProductPage from "./pages/ProductPage";
import ArtistPage from "./pages/ArtistPage";
import SearchResults from "./components/SearchResults";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <Router>
      <Header onSearch={setSearchQuery} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Slider />
              <RedBanner />
              <LocalArtists />
              <PopularItems />
              <MarketSection />
            </>
          }
        />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/artist/:seller" element={<ArtistPage />} />{" "}
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </Router>
  );
}

export default App;
