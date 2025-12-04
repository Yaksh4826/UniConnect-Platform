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

// ⭐ STUDENT PAGES ⭐
import StudentDashboard from "../pages/student/StudentDashboard.jsx";
import MyMarketplacePosts from "../pages/student/MyMarketplacePosts.jsx";

// ⭐ STAFF PAGES ⭐
import StaffDashboard from "../pages/staff/StaffDashboard.jsx";
import StaffLostFound from "../pages/staff/StaffLostFound.jsx";
import StaffEvents from "../pages/staff/StaffEvents.jsx";
import StaffMarketplace from "../pages/staff/StaffMarketplace.jsx";

// ⭐ STAFF EDIT PAGES ⭐
import StaffLostFoundEdit from "../pages/staff/StaffLostFoundEdit.jsx";
import StaffEventsEdit from "../pages/staff/StaffEventsEdit.jsx";
import StaffMarketplaceEdit from "../pages/staff/StaffMarketplaceEdit.jsx"; // ⭐ NEW

export const AppRouter = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        {/* ============================================================
            ⭐ PUBLIC ROUTES
        ============================================================ */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/lostFound" element={<LostFoundPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/lostFound/create" element={<LostItemForm />} />
        <Route path="/profile/:id" element={<ProfilePage />} />

        {/* ============================================================
            ⭐ STUDENT ROUTES
        ============================================================ */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/myposts"
          element={
            <ProtectedRoute role="student">
              <MyMarketplacePosts />
            </ProtectedRoute>
          }
        />

        {/* ============================================================
            ⭐ STAFF ROUTES
        ============================================================ */}
        <Route
          path="/staff/dashboard"
          element={
            <ProtectedRoute role="staff">
              <StaffDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/staff/lostfound"
          element={
            <ProtectedRoute role="staff">
              <StaffLostFound />
            </ProtectedRoute>
          }
        />

        {/* ⭐ Staff Edit LostFound */}
        <Route
          path="/staff/lostfound/edit/:id"
          element={
            <ProtectedRoute role="staff">
              <StaffLostFoundEdit />
            </ProtectedRoute>
          }
        />

        <Route
          path="/staff/events"
          element={
            <ProtectedRoute role="staff">
              <StaffEvents />
            </ProtectedRoute>
          }
        />

        {/* ⭐ Staff Edit Events */}
        <Route
          path="/staff/events/edit/:id"
          element={
            <ProtectedRoute role="staff">
              <StaffEventsEdit />
            </ProtectedRoute>
          }
        />

        <Route
          path="/staff/marketplace"
          element={
            <ProtectedRoute role="staff">
              <StaffMarketplace />
            </ProtectedRoute>
          }
        />

        {/* ⭐ Staff Edit Marketplace */}
        <Route
          path="/staff/marketplace/edit/:id"
          element={
            <ProtectedRoute role="staff">
              <StaffMarketplaceEdit />
            </ProtectedRoute>
          }
        />

        {/* ============================================================
            ⭐ ADMIN ROUTES
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
