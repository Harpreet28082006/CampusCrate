import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import MyItems from "./pages/MyItems/MyItems";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import PostLost from "./pages/PostLost/PostLost";
import PostFound from "./pages/PostFound/PostFound";
import ItemDetails from "./pages/ItemDetails/ItemDetails";
import Notifications from "./pages/Notifications/Notifications";
import Messages from "./pages/Messages/Messages";
import EditItem from "./pages/EditItem/EditItem";
import EditProfile from "./pages/EditProfile/EditProfile";
import Admin from "./pages/Admin/Admin";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages with Navbar */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/post-lost" element={<PostLost />} />
          <Route path="/post-found" element={<PostFound />} />
          <Route path="/my-items" element={<MyItems />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/item/:id" element={<ItemDetails />} />
          <Route path="/edit-item/:id" element={<EditItem />} />
          <Route path="/admin" element={<Admin />} />
        </Route>

        {/* Pages without Navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
