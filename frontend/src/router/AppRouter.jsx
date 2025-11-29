
import { Routes, Route } from "react-router-dom";
import { Navbar } from "../components/commonComponents/Navbar.jsx";
import { LoginPage } from "../pages/LoginPage.jsx";
import { RegisterPage } from "../pages/RegisterPage.jsx";
import { MarketplacePage } from "../pages/MarketplacePage.jsx";
import { EventsPage } from "../pages/EventsPage.jsx";
import { LostFoundPage } from "../pages/LostFoundPage.jsx";
import { HomePage } from "../pages/HomePage.jsx";
import { DiscoverPage } from "../pages/DiscoverPage.jsx";

export const AppRouter = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/lostFound" element={<LostFoundPage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/events" element={<EventsPage />} />
      </Routes>
    </div>
  );
};
