import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import CreatePostPage from './components/CreatePostPage';
import ProfilePage from "./components/ProfilePage";
import PersonalPage from './components/personalPage';

function App() {
  const [page, setPage] = useState('login');
  const [user_id, setUser_id] = useState(null);
  function openHomePage(user_id) {
    console.log(user_id)
    setUser_id(Number(user_id));
    setPage("homePage")
  } 
  


  if (page === 'login') {
    return (
      <LoginPage changePage={openHomePage}/>
    );
  };
  
  if (page === 'homePage') {
    return (
      <div className="homepageContainer">
        <CreatePostPage user_id={user_id} submitFunction={() => setPage('homePage')}/>
        <HomePage user_id={user_id}/>
        <div className='sidebar'>
          <button onClick={() => setPage("personalPage")}>View posts from people you follow</button>
        </div>
      </div>
    );
  };
  if (page === 'createPost') {
    return (
      <CreatePostPage user_id={user_id} submitFunction={() => setPage('homePage')}/>
    );
  };

  if (page === 'profilePage') {
    return (
      <ProfilePage />
    );
  };
  if (page === "personalPage") {
    return (
      <PersonalPage user_id={user_id} changePageFunction={() => setPage('homePage')} />
    )
  }

}

export default App;
