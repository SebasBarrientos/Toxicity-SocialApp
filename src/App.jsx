import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Posts from "./components/Posts/Posts";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Register from "./components/Register/Register";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import CreatePost from "./components/CreatePost/CreatePost";
import PostDetail from "./components/PostDetail/PostDetail";
import BackGround from "./components/background/BackGround";
import UserSelected from "./components/UserSelected/UserSelected";
import Search from "./components/Search/Search";
import PrivateZone from "./components/Guards/PrivateZone";
import NotFound from "./components/NotFound/NotFound";

function App() {
  return (
    <>
      <BackGround />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userSelected/:_id" element={<UserSelected />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/postdetail/:_id" element={<PostDetail />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <PrivateZone>
                <Profile />
              </PrivateZone>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/search/:caption" element={<Search />} />
          <Route path ="*" element={<NotFound/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
