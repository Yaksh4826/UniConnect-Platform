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

import ProtectedRoute from "../components/commonComponents/ProtectedRoute.jsx";

// ⭐ ADMIN PAGES ⭐
import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import AdminUsers from "../pages/admin/AdminUsers.jsx";
import AdminEvents from "../pages/admin/AdminEvents.jsx";
import AdminMarketplace from "../pages/admin/AdminMarketplace.jsx";
import AdminLostFound from "../pages/admin/AdminLostFound.jsx";

// ⭐ STUDENT DASHBOARD ⭐ (NEW)
import StudentDashboard from "../pages/student/StudentDashboard.jsx";

// ⭐ STUDENT SUB-PAGES ⭐ (NEW)
import MyMarketplacePosts from "../pages/student/MyMarketplacePosts.jsx";

export const AppRouter = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/lostFound" element={<LostFoundPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/lostFound/create" element={<LostItemForm />} />
        <Route path="/profile/:id" element={<ProfilePage />} />

        {/* ============================================================
            ⭐ STUDENT DASHBOARD ROUTES (LOGGED IN USERS ONLY)
           ============================================================ */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/myposts"
          element={
            <ProtectedRoute>
              <MyMarketplacePosts />
            </ProtectedRoute>
          }
        />

        {/* ============================================================
            ⭐ ADMIN ROUTES — Protected by ROLE ⭐
           ============================================================ */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="admin">
              <AdminUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/events"
          element={
            <ProtectedRoute role="admin">
              <AdminEvents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/marketplace"
          element={
            <ProtectedRoute role="admin">
              <AdminMarketplace />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/lostfound"
          element={
            <ProtectedRoute role="admin">
              <AdminLostFound />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};
