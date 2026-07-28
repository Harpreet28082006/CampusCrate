import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import PostLost from "./pages/PostLost/PostLost";
import PostFound from "./pages/PostFound/PostFound";
import ItemDetails from "./pages/ItemDetails/ItemDetails";
import Admin from "./pages/Admin/Admin";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/post-lost" element={<PostLost />} />
          <Route path="/post-found" element={<PostFound />} />
          <Route path="/item/:id" element={<ItemDetails />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;