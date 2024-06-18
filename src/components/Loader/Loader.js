// Loader.js
import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="container" style={{background:"#e6e2e2",width:"100%",height:"100vh"}}>
      <svg width="100%" height="100" viewBox="-1 -1 22 22">
        <path style={{ "--order": 7 }} className="eight e-8"></path>
        <path style={{ "--order": 6 }} className="eight e-7"></path>
        <path style={{ "--order": 5 }} className="eight e-6"></path>
        <path style={{ "--order": 4 }} className="eight e-5"></path>
        <path style={{ "--order": 3 }} className="eight e-4"></path>
        <path style={{ "--order": 2 }} className="eight e-3"></path>
        <path style={{ "--order": 1 }} className="eight e-2"></path>
        <path style={{ "--order": 0 }} className="eight e-1"></path>
      </svg>
    </div>
  );
}

export default Loader;
