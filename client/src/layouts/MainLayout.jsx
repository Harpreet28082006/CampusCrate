import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";
import "./MainLayout.css";

function MainLayout() {
  return (
    <div className="layout">

      <Sidebar />

      <div className="layout-content">

        <main className="page-content">
          <Outlet />
        </main>

        <Footer />

      </div>

    </div>
  );
}

export default MainLayout;