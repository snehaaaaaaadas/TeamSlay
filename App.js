import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Ticker from './components/Ticker';
import HomePage from './pages/HomePage';
import AddMemberPage from './pages/AddMemberPage';
import ViewMembersPage from './pages/ViewMembersPage';
import MemberDetailsPage from './pages/MemberDetailsPage';
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="app">
        <Ticker />
        <Navbar />
        <main className="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-member" element={<AddMemberPage />} />
            <Route path="/members" element={<ViewMembersPage />} />
            <Route path="/members/:id" element={<MemberDetailsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
