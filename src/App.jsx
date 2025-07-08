import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Profile from './pages/Profile';
import CommentsDashboard from './pages/CommentsDashboard';
import Header from './components/Header';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('activeUser'));
    if (savedUser) {
      setUser(savedUser);
    } else {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(data => {
          localStorage.setItem('activeUser', JSON.stringify(data[0]));
          setUser(data[0]);
          console.log(data)
            .catch(err => console.error('Failed to fetch user', err))
        });
    }
  }, []);




  return (
    <BrowserRouter>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<CommentsDashboard />} />
        <Route path="/profile" element={<Profile user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
