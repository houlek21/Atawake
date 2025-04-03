import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Slider from "./components/Slider";
import RedBanner from "./components/RedBanner";
import LocalArtists from "./components/LocalArtists";
import PopularItems from "./components/PopularItems";
import MarketSection from "./components/MarketSection";
import ProductPage from "./pages/ProductPage";
import ArtistPage from "./pages/ArtistPage";

import LoginPage from "./pages/login.jsx";
import SignupPage from "./pages/signup.jsx";
import SellerSignupPage from "./pages/sellerreg.jsx";
import AddItemPage1 from "./pages/ad1.jsx";
import AddItemPage2 from "./pages/ad2.jsx";
import BuyPage from "./pages/buy.jsx";
import CheckoutPage from "./pages/checkoutPage.jsx";
import CartPage from "./pages/CartPage.jsx";

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

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/sellersignup" element={<SellerSignupPage />} />
        <Route path="/addprod1" element={<AddItemPage1 />} />
        <Route path="/addprod2" element={<AddItemPage2 />} />
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/buy/:cate" element={<BuyPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/cart" element={<CartPage />} />


        <Route path="/artist/:seller/product/:productName" element={<ProductPage />} />
        <Route path="/artist/:seller" element={<ArtistPage />} /> {/* NEW ROUTE */}
      </Routes>
    </Router>
  );
}

export default App;
