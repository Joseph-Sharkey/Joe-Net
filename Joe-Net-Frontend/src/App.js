import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import CreatePostPage from './components/CreatePostPage';
import ProfilePage from "./components/ProfilePage";

function App() {
  const [page, setPage] = useState('login');

  if (page === 'login') {
    return (
      <LoginPage />
    );
  };
  
  if (page === 'homePage') {
    return (
      <HomePage />
    );
  };
  if (page === 'createPost') {
    return (
      <CreatePostPage />
    );
  };

  if (page === 'profilePage') {
    return (
      <ProfilePage />
    );
  };

}

export default App;
