import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Slider from "./components/Slider";
import RedBanner from "./components/RedBanner";
import LocalArtists from "./components/LocalArtists";
import PopularItems from "./components/PopularItems";
import MarketSection from "./components/MarketSection";
import ArtistStories from "./components/ArtistStories";
import Footer from "./components/Footer.jsx";

import ProductPage from "./pages/ProductPage";
import ArtistPage from "./pages/ArtistPage";
import LoginPage from "./pages/login.jsx";
import SignupPage from "./pages/signup.jsx";
import SellerSignupPage from "./pages/sellerreg.jsx";
import AddItemPage1 from "./pages/ad1.jsx";
import AddItemPage2 from "./pages/ad2.jsx";
import BuyPage from "./pages/buy.jsx";

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
              <ArtistStories />
            </>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/sellersignup" element={<SellerSignupPage />} />
        <Route path="/addprod1" element={<AddItemPage1 />} />
        <Route path="/addprod2" element={<AddItemPage2 />} />
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/buy/:cate" element={<BuyPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/artist/:seller" element={<ArtistPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
