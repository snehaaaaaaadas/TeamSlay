import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';

export default function HomePage() {
  const [count, setCount] = useState('??');

  useEffect(() => {
    axios.get('/api/members')
      .then(r => setCount(r.data.length))
      .catch(() => setCount('??'));
  }, []);

  return (
    <div className="home">

      {/* Hero */}
      <section className="hero">
        <div className="hero-left">
          <p className="hero-label">// TEAM MANAGEMENT SYSTEM v1.0</p>
          <h1 className="hero-title">
            <span className="title-line1">MEET</span>
            <span className="title-line2">THE</span>
            <span className="title-line3">SQUAD</span>
          </h1>
          <p className="hero-sub">
            Built different. Track your team, own your stack.
            <br />
            Full MERN. Zero excuses.
          </p>
          <div className="hero-btns">
            <Link to="/add-member" className="btn-primary">+ ADD MEMBER</Link>
            <Link to="/members" className="btn-outline">VIEW ROSTER →</Link>
          </div>
        </div>

        <div className="hero-right">
          <div className="stat-box">
            <p className="stat-num">{count}</p>
            <p className="stat-label">MEMBERS<br />IN DATABASE</p>
          </div>
          <div className="deco-grid">
            {Array.from({length: 25}).map((_, i) => (
              <div key={i} className="deco-cell" style={{ animationDelay: `${i * 0.06}s` }} />
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider-bar">
        <span>★ FEATURES</span>
        <span>★ FEATURES</span>
        <span>★ FEATURES</span>
        <span>★ FEATURES</span>
        <span>★ FEATURES</span>
      </div>

      {/* Feature cards */}
      <section className="features">
        {[
          { num: '01', title: 'ADD MEMBERS', desc: 'Drop in name, role, email, phone, bio + a photo. One form, stored forever in MongoDB.', color: 'var(--lime)', link: '/add-member', cta: 'GO TO FORM' },
          { num: '02', title: 'VIEW ROSTER', desc: 'Full grid of your entire squad. Profile pics, roles, contact info — all in one place.', color: 'var(--cyan)', link: '/members', cta: 'SEE ROSTER' },
          { num: '03', title: 'MEMBER PROFILE', desc: 'Click any card for the full dossier. Every detail, fetched live from the API.', color: 'var(--pink)', link: '/members', cta: 'EXPLORE' },
        ].map((f, i) => (
          <div className="feat-card" key={i} style={{ '--accent': f.color }}>
            <span className="feat-num">{f.num}</span>
            <h3 className="feat-title">{f.title}</h3>
            <p className="feat-desc">{f.desc}</p>
            <Link to={f.link} className="feat-link">{f.cta} →</Link>
          </div>
        ))}
      </section>

      {/* Tech stack strip */}
      <section className="tech-strip">
        <p className="tech-label">BUILT WITH:</p>
        <div className="tech-pills">
          {['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'Multer', 'Axios'].map(t => (
            <span key={t} className="tech-pill">{t}</span>
          ))}
        </div>
      </section>

    </div>
  );
}
