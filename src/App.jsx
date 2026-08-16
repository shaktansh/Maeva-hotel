import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";
import CursorDot from "./components/CursorDot";
import WelcomeSplash from "./components/WelcomeSplash";
import OfferPopup from "./components/OfferPopup";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function AppRoutes() {
  const location = useLocation();
  const isAuth = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      <ScrollProgress />
      <CursorDot />
      {!isAuth && <WelcomeSplash />}
      {!isAuth && <BackToTop />}
      {!isAuth && <OfferPopup />}
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <MemoryRouter initialEntries={["/"]} initialIndex={0}>
      <AppRoutes />
    </MemoryRouter>
  );
}
