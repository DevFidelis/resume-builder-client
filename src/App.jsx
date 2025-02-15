// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResumeCreator from "./components/ResumeCreator/ResumeCreator";
import LandingPage from "./pages/LandingPage";
import PageNotFound from "./pages/PageNotFound";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create" element={<ResumeCreator />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}