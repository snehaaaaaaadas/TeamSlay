import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddMemberPage.css';

export default function AddMemberPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:'', role:'', email:'', phone:'', bio:'', github:'', linkedin:'' });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleImg = (e) => {
    const f = e.target.files[0];
    if (f) { setImage(f); setPreview(URL.createObjectURL(f)); }
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'REQUIRED';
    if (!form.role.trim()) e.role = 'REQUIRED';
    if (!form.email.trim()) e.email = 'REQUIRED';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'INVALID EMAIL';
    return e;
  };

  const submit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (image) fd.append('image', image);
      await axios.post('/api/members', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setSuccess(true);
      setTimeout(() => navigate('/members'), 1500);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add member');
    } finally { setLoading(false); }
  };

  if (success) return (
    <div className="success-screen">
      <div className="success-box">
        <p className="success-tag">// STATUS: 201 CREATED</p>
        <h2>MEMBER ADDED</h2>
        <p>Redirecting to roster...</p>
        <div className="success-bar" />
      </div>
    </div>
  );

  return (
    <div className="add-page">
      <div className="add-header">
        <p className="page-tag">// ADD_MEMBER.JS</p>
        <h1 className="page-title">
          <span>ADD</span>
          <span className="title-accent">MEMBER</span>
        </h1>
        <p className="page-sub">Fill the form below. Fields marked * are required.</p>
      </div>

      <form className="add-form" onSubmit={submit}>
        {/* Photo upload */}
        <label className="photo-drop">
          {preview
            ? <img src={preview} alt="preview" className="photo-preview" />
            : <div className="photo-empty">
                <span className="photo-icon">[ PHOTO ]</span>
                <span className="photo-hint">CLICK TO UPLOAD</span>
                <span className="photo-sub">JPG / PNG / MAX 5MB</span>
              </div>
          }
          <input type="file" accept="image/*" onChange={handleImg} hidden />
        </label>

        <div className="fields-grid">
          {[
            { name: 'name', label: 'FULL NAME', ph: 'e.g. Gopal Kumar', req: true },
            { name: 'role', label: 'ROLE', ph: 'e.g. Frontend Dev', req: true },
            { name: 'email', label: 'EMAIL', ph: 'gopal@team.com', type: 'email', req: true },
            { name: 'phone', label: 'PHONE', ph: '+91 98765 43210' },
            { name: 'github', label: 'GITHUB', ph: 'github.com/username' },
            { name: 'linkedin', label: 'LINKEDIN', ph: 'linkedin.com/in/user' },
          ].map(f => (
            <div className={`field ${errors[f.name] ? 'has-err' : ''}`} key={f.name}>
              <label className="field-label">
                {f.label}{f.req && <span className="req-star">*</span>}
              </label>
              <input
                name={f.name}
                type={f.type || 'text'}
                value={form[f.name]}
                onChange={change}
                placeholder={f.ph}
                className="field-input"
              />
              {errors[f.name] && <span className="err-tag">{errors[f.name]}</span>}
            </div>
          ))}

          <div className="field full">
            <label className="field-label">BIO</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={change}
              placeholder="A short intro about this member..."
              className="field-input"
              rows={4}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={() => navigate('/members')}>
            ← CANCEL
          </button>
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'SAVING...' : '+ ADD MEMBER'}
          </button>
        </div>
      </form>
    </div>
  );
}
