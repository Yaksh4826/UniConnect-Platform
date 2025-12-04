import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "../components/commonComponents/Navbar.jsx";
import ProtectedRoute from "../components/commonComponents/ProtectedRoute.jsx";

// Eager loading for critical initial pages
import { HomePage } from "../pages/HomePage.jsx";
import { LoginPage } from "../pages/LoginPage.jsx";

// Lazy loading for other pages to improve initial load time
const RegisterPage = lazy(() => import("../pages/RegisterPage.jsx").then(module => ({ default: module.RegisterPage })));
const LostFoundPage = lazy(() => import("../pages/LostFoundPage.jsx").then(module => ({ default: module.LostFoundPage })));
const MarketplacePage = lazy(() => import("../pages/MarketplacePage.jsx").then(module => ({ default: module.MarketplacePage })));
const EventsPage = lazy(() => import("../pages/EventsPage.jsx").then(module => ({ default: module.EventsPage })));
const ProfilePage = lazy(() => import("../pages/ProfilePage.jsx").then(module => ({ default: module.ProfilePage })));
const LostItemForm = lazy(() => import("../components/lostFound/LostItemForm.jsx").then(module => ({ default: module.LostItemForm })));
const MyMarketplacePosts = lazy(() => import("../pages/student/MyMarketplacePosts.jsx")); // Default exports handled automatically
const StudentDashboard = lazy(() => import("../pages/student/StudentDashboard.jsx"));
const MessagesPage = lazy(() => import("../pages/MessagesPage.jsx").then(module => ({ default: module.MessagesPage })));

// Admin Pages (Lazy)
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard.jsx"));
const AdminUsers = lazy(() => import("../pages/admin/AdminUsers.jsx"));
const AdminEvents = lazy(() => import("../pages/admin/AdminEvents.jsx"));
const AdminMarketplace = lazy(() => import("../pages/admin/AdminMarketplace.jsx"));
const AdminLostFound = lazy(() => import("../pages/admin/AdminLostFound.jsx"));

// Staff Pages (Lazy)
const StaffDashboard = lazy(() => import("../pages/staff/StaffDashboard.jsx"));
const StaffLostFound = lazy(() => import("../pages/staff/StaffLostFound.jsx"));
const StaffEvents = lazy(() => import("../pages/staff/StaffEvents.jsx"));
const StaffMarketplace = lazy(() => import("../pages/staff/StaffMarketplace.jsx"));
const StaffLostFoundEdit = lazy(() => import("../pages/staff/StaffLostFoundEdit.jsx"));
const StaffEventsEdit = lazy(() => import("../pages/staff/StaffEventsEdit.jsx"));
const StaffMarketplaceEdit = lazy(() => import("../pages/staff/StaffMarketplaceEdit.jsx"));


// Loading Component
const PageLoader = () => (
  <div className="flex justify-center items-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#130745]"></div>
  </div>
);

export const AppRouter = () => {
  return (
    <div>
      <Navbar />
      
      <Suspense fallback={<PageLoader />}>
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
          <Route
            path="/lostFound/create"
            element={
              <ProtectedRoute>
                <LostItemForm />
              </ProtectedRoute>
            }
          />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <MessagesPage />
              </ProtectedRoute>
            }
          />

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
      </Suspense>
    </div>
  );
};
