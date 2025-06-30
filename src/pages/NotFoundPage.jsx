import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <main className="main-content">
        <section className="error-section">
          <div className="container">
            <div className="error-card">
              <h1 className="error-title">404</h1>
              <h2 className="error-subtitle">Page Not Found</h2>
              <p className="error-description">
                The page you're looking for doesn't exist or has been moved.
              </p>

              <div className="error-actions">
                <Link to="/" className="btn btn-primary">
                  Go Home
                </Link>
                <button
                  onClick={() => window.history.back()}
                  className="btn btn-secondary"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default NotFoundPage;
