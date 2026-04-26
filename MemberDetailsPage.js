import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MemberDetailsPage.css';

export default function MemberDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/members/${id}`)
      .then(r => setMember(r.data))
      .catch(() => navigate('/members'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!window.confirm('PERMANENTLY REMOVE THIS MEMBER?')) return;
    await axios.delete(`/api/members/${id}`);
    navigate('/members');
  };

  if (loading) return (
    <div className="loading">
      <div className="loading-box">
        <p className="loading-tag">// GET /api/members/{id.slice(0, 8)}...</p>
        <div className="loading-bar"><div className="loading-fill" /></div>
      </div>
    </div>
  );
  if (!member) return null;

  const joined = new Date(member.createdAt).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric'
  }).toUpperCase();

  return (
    <div className="detail-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/" className="bc-link">HOME</Link>
        <span className="bc-sep">/</span>
        <Link to="/members" className="bc-link">MEMBERS</Link>
        <span className="bc-sep">/</span>
        <span className="bc-current">{member.name.toUpperCase()}</span>
      </div>

      {/* Main card */}
      <div className="detail-card">
        {/* Left panel */}
        <div className="detail-left">
          <div className="detail-avatar">
            {member.image
              ? <img src={`http://localhost:5000/uploads/${member.image}`} alt={member.name} />
              : <span className="avatar-initial">{member.name[0]}</span>
            }
          </div>
          <div className="detail-role-tag">{member.role}</div>
          <div className="detail-joined">
            <span className="joined-label">JOINED</span>
            <span className="joined-val">{joined}</span>
          </div>
          <div className="member-id-box">
            <span className="id-label">MEMBER ID</span>
            <code className="id-val">{member._id.slice(-8)}</code>
          </div>
        </div>

        {/* Right panel */}
        <div className="detail-right">
          <p className="detail-tag">// MEMBER PROFILE</p>
          <h1 className="detail-name">{member.name}</h1>

          {member.bio && (
            <div className="detail-bio">
              <p className="section-label">BIO</p>
              <p className="bio-text">{member.bio}</p>
            </div>
          )}

          <div className="detail-sep" />

          <div className="contact-table">
            {[
              { k: 'EMAIL',    v: member.email,    href: `mailto:${member.email}` },
              { k: 'PHONE',    v: member.phone,    href: `tel:${member.phone}` },
              { k: 'GITHUB',   v: member.github,   href: member.github ? `https://${member.github.replace(/^https?:\/\//,'')}` : null },
              { k: 'LINKEDIN', v: member.linkedin, href: member.linkedin ? `https://${member.linkedin.replace(/^https?:\/\//,'')}` : null },
            ].filter(r => r.v).map(r => (
              <div key={r.k} className="contact-row">
                <span className="contact-key">{r.k}</span>
                {r.href
                  ? <a href={r.href} target="_blank" rel="noreferrer" className="contact-val link">{r.v}</a>
                  : <span className="contact-val">{r.v}</span>
                }
              </div>
            ))}
          </div>

          <div className="detail-actions">
            <Link to="/members" className="btn-back">← BACK</Link>
            <Link to="/add-member" className="btn-add-another">+ ADD ANOTHER</Link>
            <button onClick={handleDelete} className="btn-delete">✕ REMOVE</button>
          </div>
        </div>
      </div>
    </div>
  );
}
