import { Routes, Route } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { Header } from "./components/Header/Header.jsx";
import { Footer } from "./components/Footer/Footer.jsx";
import { Login } from "./pages/Login/Login.jsx";
import { Register } from "./pages/Register/Register.jsx";
import { Profile } from "./pages/Profile/Profile.jsx";
import { Info } from "./pages/Info/Info.jsx";
import { ArtWork } from "./pages/ArtWork/ArtWork.jsx";
import { Catalog } from "./pages/Catalog/Catalog.jsx";
import { AddArtWork } from "./pages/AddArtWork/AddArtWork.jsx";
import { ModerationPage } from "./pages/Moderation/ModerationPage.jsx";

import { fetchUserLogin, selectIsAuth } from "./redux/slices/auth.js";

export function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  
  useEffect(() => {
    dispatch(fetchUserLogin());
  }, [dispatch]);

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div className="content" style={{ flex: 1 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Info />} />
          <Route path="/art/:id" element={<ArtWork />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/profile/add" element={<AddArtWork />} />
          <Route path="/moderation" element={<ModerationPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
