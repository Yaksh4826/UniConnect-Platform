
import { Routes, Route } from "react-router-dom";
import { Navbar } from "../components/commonComponents/Navbar.jsx";
import { LoginPage } from "../pages/LoginPage.jsx";
import { RegisterPage } from "../pages/RegisterPage.jsx";
import { MarketplacePage } from "../pages/MarketplacePage.jsx";
import { EventsPage } from "../pages/EventsPage.jsx";
import { LostFoundPage } from "../pages/LostFoundPage.jsx";
import { HomePage } from "../pages/HomePage.jsx";
import { ProfilePage } from "../pages/ProfilePage.jsx";
  import { LostItemForm } from "../components/lostFound/LostItemForm.jsx";
export const AppRouter = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/lostFound" element={<LostFoundPage />} />
      
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/events" element={<EventsPage />} />
       <Route path="/lostFound/create" element={<LostItemForm />} />
<Route path="/profile/:id" element={<ProfilePage/>}/>

      </Routes>
     
    </div>
  );
};
