import React from 'react';
import './Ticker.css';

const items = ['★ TEAMSLAY', '✦ MERN STACK', '◆ REACT.JS', '● MONGODB', '★ NODE.JS', '✦ EXPRESS', '◆ FULL STACK', '● BUILT DIFFERENT'];

export default function Ticker() {
  const repeated = [...items, ...items];
  return (
    <div className="ticker">
      <div className="ticker-track">
        {repeated.map((t, i) => <span key={i} className="ticker-item">{t}</span>)}
      </div>
    </div>
  );
}
