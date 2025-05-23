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
import AccountSideBar from "./components/AccountSideBar";

import ProductPage from "./pages/ProductPage";
import ArtistPage from "./pages/ArtistPage";

import SettingsPage from "./pages/AccountSettingsSETUP.jsx";
import LoginPage from "./pages/Login.jsx";
import SignupPage from "./pages/signup.jsx";
import SellerSignupPage from "./pages/sellerreg.jsx";
import AddItemPage1 from "./pages/AddProdPage1.jsx";
import AddItemPage2 from "./pages/AddProdPage2.jsx";
import BuyPage from "./pages/buy.jsx";
import AccountPage from "./pages/account.jsx";
import SellerPage from "./pages/SellerPage.jsx";
import CheckoutPage from "./pages/checkoutPage.jsx";
import CartPage from "./pages/CartPage.jsx";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <Router>
      <Header onSearch={setSearchQuery} />

      <Routes>
        <Route path="/" element={
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
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/addprod1" element={
          <>
            <AccountSideBar />
            <AddItemPage1 />
          </>} />

        <Route path="/addprod2" element={
          <>
            <AccountSideBar />
            <AddItemPage2 />
          </>} />

        <Route path="/dashboard" element={
          <>
            <AccountSideBar />
            <AccountPage />
          </>} />


        <Route path="/buy" element={<BuyPage />} />
        <Route path="/buy/:cate" element={<BuyPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/cart" element={<CartPage />} />

        <Route path="/seller" element={<SellerPage />} />
        <Route path="/artist/:seller/product/:productName" element={<ProductPage />} />
        <Route path="/artist/:seller" element={<ArtistPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

