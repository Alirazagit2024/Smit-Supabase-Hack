import React, { Suspense, lazy, useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton";
import { AuthContext } from "../context/AuthContext";

// Import both sidebars
import UserSidebar from "../components/UserSidebar";
import AdminSidebar from "../components/AdminSidebar";

// Import UserChat for ChatWrapper
import UserChat from "../pages/UserChat/UserChat.jsx";
import ErrorBoundary from "../components/ErrorBoundary.jsx";

// const AiChatWidget = lazy(() => import("../components/AiChatWidget"));

function MainLayout() {
  const { role, loading, user } = useContext(AuthContext);

  if (loading) {
    return <div className="text-center py-20 text-xl font-semibold">Loading...</div>;
  }

  // Show AdminSidebar only if role is admin
  const SidebarComponent = role === "admin" ? AdminSidebar : UserSidebar;

  // ChatWrapper logic (only for authenticated users)
  const ChatWrapper = () => {
    if (loading || !user) {
      return null;
    }

    return (
      <ErrorBoundary>
        <UserChat />
      </ErrorBoundary>
    );
  };

  return (
    <>
      <Navbar />

      <div className="flex min-h-[calc(100vh-128px)]">
        <SidebarComponent />

        <main className="flex-1 sm:p-6 bg-gray-100 overflow-x-auto hide-scrollbar">
          <Outlet />
        </main>

        <ChatWrapper /> {/* Added ChatWrapper here */}
      </div>

      <ScrollToTopButton />

      {/* <Suspense>
        <AiChatWidget />
      </Suspense> */}

      <Footer />
    </>
  );
}

export default MainLayout;