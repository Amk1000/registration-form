import Login from './components/Login'
import Signup from './components/Signup'
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  const [currentRoute, setCurrentRoute] = useState('');
  return (
   <Router>
       <Routes>
        <Route path="/" Component={Login} />
        <Route path="/signup" Component={Signup} />
      </Routes>
    </Router>
  );
}

export default App;
