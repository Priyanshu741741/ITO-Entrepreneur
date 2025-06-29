// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout/Layout';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import FindMentor from './pages/FindMentor/FindMentor';
import FindFounder from './pages/FindFounder/FindFounder';
import OnlinePitching from './pages/OnlinePitching/OnlinePitching';
import StartupIdeas from './pages/StartupIdeas/StartupIdeas';
import Forum from './pages/ForumSection/ForumSection';
import Chatbot from './pages/Chatbot/Chatbot';

function App() {
  return (
    <div style={{ padding: "20px", textAlign: "center", marginTop: "100px" }}>
      <h1>TEST DISPLAY - ITO APP</h1>
      <p>If you can see this, rendering is working!</p>
      
      <Router>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/find-mentor" element={<Layout><FindMentor /></Layout>} />
          <Route path="/find-founder" element={<Layout><FindFounder /></Layout>} />
          <Route path="/online-pitching" element={<Layout><OnlinePitching /></Layout>} />
          <Route path="/startup-ideas" element={<Layout><StartupIdeas /></Layout>} />
          <Route path="/forum" element={<Layout><Forum /></Layout>} />
          <Route path="/chatbot" element={<Layout><Chatbot /></Layout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;