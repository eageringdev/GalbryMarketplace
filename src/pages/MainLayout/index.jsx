import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./index.scss";

// import layouts
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";
import Sidebar from "@/layouts/Sidebar";

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname == "/") {
      navigate("/explore");
    }
  }, []);

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="main_content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
