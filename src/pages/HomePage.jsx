import React from 'react';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="home-page">
      <main className="main-content">
        <section className="hero-section">
          <div className="container">
            <h1 className="hero-title">{t('welcome')}</h1>
            <p className="hero-subtitle">A comprehensive SCSS setup for modern React applications</p>
          </div>
        </section>

        <section className="features-section">
          <div className="container">
            <h2 className="section-title">Features</h2>
            <div className="features-grid">
              <div className="feature-card">
                <h3 className="feature-title">SCSS Architecture</h3>
                <p className="feature-description">
                  7-1 pattern with abstracts, base, components, layout, pages, and utilities.
                </p>
              </div>
              <div className="feature-card">
                <h3 className="feature-title">React Router</h3>
                <p className="feature-description">Clean routing with React Router DOM for seamless navigation.</p>
              </div>
              <div className="feature-card">
                <h3 className="feature-title">Modern React</h3>
                <p className="feature-description">React 19 with hooks, functional components, and modern patterns.</p>
              </div>
              <div className="feature-card">
                <h3 className="feature-title">Vite Build</h3>
                <p className="feature-description">Lightning-fast development and optimized production builds.</p>
              </div>
              <div className="feature-card">
                <h3 className="feature-title">Responsive Design</h3>
                <p className="feature-description">Mobile-first approach with SCSS mixins and media queries.</p>
              </div>
              <div className="feature-card">
                <h3 className="feature-title">Code Quality</h3>
                <p className="feature-description">
                  ESLint configuration for consistent code style and best practices.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
