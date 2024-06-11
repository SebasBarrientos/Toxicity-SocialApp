
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import Posts from './components/Posts/Posts'
import Login from './components/Login/Login'
import Profile from './components/Profile/Profile'
import Register from './components/Register/Register'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import CreatePost from './components/CreatePost/CreatePost'
import PostDetail from './components/PostDetail/PostDetail'
import BackGround from './components/background/BackGround'

function App() {

  return (
    <>
      <BackGround/>
      <BrowserRouter>
      
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/createPost" element={<CreatePost />} />
              <Route path="/postdetail/:_id" element={<PostDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/register" element={<Register />} />
            </Routes>
            <Footer />
          
        
      </BrowserRouter>
    </>
  )
}

export default App
