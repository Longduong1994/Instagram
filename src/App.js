import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import Index from "./components/Index";
import Sidebar from "./components/Sidebar";
import User from "./components/User";
import NotFound from "./components/NotFoud";
import Explore from "./components/Explore";
import Reels from "./components/Reels";
import Messages from "./components/Messages";
import Profile from "./page/Profile";
import Login from "./user/Login";
import Register from "./user/Register";
import ChangePassword from "./user/ChangePassword";
import Suggested from "./page/Suggested";

function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Giả lập quá trình load trang
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  //kiểm tra trạng thái đăng nhập
  let isLogin = JSON.parse(localStorage.getItem("isLogin"));

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="App">
      {loading ? (
        <div className="loading-overlay">
          <div className="loader"></div>
          <p>Đang tải...</p>
        </div>
      ) : (
        <>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/login/register" element={<Register />} />
            <Route path="/changepassword" element={<ChangePassword />} />
           
          </Routes>

          <Sidebar />

          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/explore" element={<Explore />}></Route>
            <Route path="/reels" element={<Reels />}></Route>
            <Route path="/mesages" element={<Messages />}></Route>
            <Route path="/user" element={<User />}></Route>
            <Route path="/user/profile" element={<Profile />}></Route>
            <Route path="/index/suggested" element={<Suggested />}></Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
