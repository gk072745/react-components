import React from 'react';
import Counter from '../components/Counter';

const CounterPage = () => {
  return (
    <div className="counter-page">
      <main className="main-content">
        <section className="hero-section">
          <div className="container">
            <h1 className="hero-title">Counter Demo</h1>
            <p className="hero-subtitle">Interactive counter component with SCSS styling</p>
          </div>
        </section>

        <section className="counter-section">
          <div className="container">
            <Counter />
          </div>
        </section>

        <section className="info-section">
          <div className="container">
            <div className="info-card">
              <h2 className="info-title">How it works</h2>
              <p className="info-text">
                This counter demonstrates React state management with useState hook, event handling, and SCSS styling
                with variables and responsive design.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CounterPage;
