import React, { Suspense, lazy, useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton";
import { AuthContext } from "../context/AuthContext";

// Import both sidebars
import UserSidebar from "../components/UserSidebar";
import AdminSidebar from "../components/AdminSidebar";

// const AiChatWidget = lazy(() => import("../components/AiChatWidget"));

function MainLayout() {
  const { role, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="text-center py-20 text-xl font-semibold">Loading...</div>;
  }

  // Show AdminSidebar only if role is admin
  const SidebarComponent = role === "admin" ? AdminSidebar : UserSidebar;

  return (
    <>
      <Navbar />

      <div className="flex min-h-[calc(100vh-128px)]">
        <SidebarComponent />

        <main className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>

      <ScrollToTopButton />

      <Suspense>
        {/* <AiChatWidget /> */}
      </Suspense>

      <Footer />
    </>
  );
}

export default MainLayout;
