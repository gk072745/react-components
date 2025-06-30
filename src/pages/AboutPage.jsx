import React from 'react';

const AboutPage = () => {
  return (
    <div className="about-page">
      <main className="main-content">
        <section className="hero-section">
          <div className="container">
            <h1 className="hero-title">About React Boilerplate</h1>
            <p className="hero-subtitle">A modern React setup with SCSS architecture and React Router</p>
          </div>
        </section>

        <section className="content-section">
          <div className="container">
            <div className="content-card">
              <h2 className="content-title">Features</h2>
              <ul className="feature-list">
                <li>React 19 with modern hooks</li>
                <li>SCSS architecture with 7-1 pattern</li>
                <li>React Router for navigation</li>
                <li>Vite for fast development</li>
                <li>ESLint for code quality</li>
                <li>Responsive design with mobile-first approach</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
