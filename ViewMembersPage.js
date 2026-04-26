import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ViewMembersPage.css';

const ACCENTS = ['#c8ff00', '#ff2d78', '#00e5ff', '#ff6b00', '#c8ff00', '#ff2d78'];

export default function ViewMembersPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchMembers = () => {
    axios.get('/api/members')
      .then(r => setMembers(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchMembers(); }, []);

  const handleDelete = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm('REMOVE THIS MEMBER?')) return;
    await axios.delete(`/api/members/${id}`);
    setMembers(prev => prev.filter(m => m._id !== id));
  };

  const filtered = members.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.role.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div className="loading">
      <div className="loading-box">
        <p className="loading-tag">// FETCHING DATA...</p>
        <div className="loading-bar">
          <div className="loading-fill" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="view-page">
      {/* Header */}
      <div className="view-header">
        <div className="view-title-row">
          <div>
            <p className="page-tag">// MEMBERS.JS — GET /api/members</p>
            <h1 className="view-title">
              THE <span className="title-pink">ROSTER</span>
            </h1>
          </div>
          <div className="view-meta">
            <span className="count-badge">{members.length} MEMBERS</span>
            <Link to="/add-member" className="btn-add">+ ADD</Link>
          </div>
        </div>

        <div className="search-row">
          <span className="search-prefix">SEARCH://</span>
          <input
            type="text"
            className="search-input"
            placeholder="TYPE NAME OR ROLE..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button className="search-clear" onClick={() => setSearch('')}>✕</button>
          )}
        </div>
      </div>

      {/* Empty */}
      {filtered.length === 0 && (
        <div className="empty-box">
          <p className="empty-code">404</p>
          <p className="empty-msg">{search ? `NO MATCH FOR "${search.toUpperCase()}"` : 'NO MEMBERS IN DATABASE'}</p>
          {!search && <Link to="/add-member" className="btn-add" style={{marginTop:'1rem'}}>+ ADD FIRST MEMBER</Link>}
        </div>
      )}

      {/* Grid */}
      <div className="members-grid">
        {filtered.map((m, i) => {
          const accent = ACCENTS[i % ACCENTS.length];
          return (
            <Link to={`/members/${m._id}`} key={m._id} className="member-card" style={{ '--accent': accent, animationDelay: `${i * 0.07}s` }}>
              <div className="card-top" style={{ background: accent }}>
                {m.image
                  ? <img src={`http://localhost:5000/uploads/${m.image}`} alt={m.name} className="card-img" />
                  : <span className="card-initial">{m.name[0]}</span>
                }
                <span className="card-index">#{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="card-body">
                <h3 className="card-name">{m.name}</h3>
                <p className="card-role">{m.role}</p>
                <p className="card-email">{m.email}</p>
                {m.phone && <p className="card-phone">{m.phone}</p>}
                <div className="card-footer">
                  <span className="view-link">VIEW DETAILS →</span>
                  <button
                    className="del-btn"
                    onClick={(e) => handleDelete(m._id, e)}
                    title="Delete member"
                  >✕</button>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
