import React, { useEffect, useState } from 'react';
import WHOService from '../services/whoService';

const WHOSection: React.FC<{ fallback?: boolean }> = ({ fallback = false }) => {
  const [whoData, setWhoData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showData, setShowData] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  // Only fetch data when user clicks the button
  const fetchData = () => {
    setLoading(true);
    setError(null);
    WHOService.fetchGlobalData()
      .then((data) => {
        setWhoData(data || []);
        setLoading(false);
        setInitialLoad(false);
      })
      .catch((err) => {
        setError('Failed to load WHO data.');
        setLoading(false);
        setInitialLoad(false);
      });
  };

  // Sort by total cases descending and take top 6
  const topCountries = whoData
    .filter(row => row.country && !isNaN(row.totalCases))
    .sort((a, b) => b.totalCases - a.totalCases)
    .slice(0, 6);

  return (
    <section className="features-section" style={{ margin: '2rem 0' }}>
      <div className="features-container">
        <div className="features-header">
          <h2 className="features-title">
            {fallback ? 'COVID-19 Data (WHO Fallback)' : 'COVID-19 Data (WHO)'}
          </h2>
          <p className="features-description">
            Latest COVID-19 statistics from the World Health Organization (WHO).
          </p>
        </div>
        {!showData && (
          <button
            className="feature-card"
            style={{ margin: '0 auto', display: 'block', padding: '1rem 2rem', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer', background: 'var(--background-card)', border: '1px solid var(--glass-border)', borderRadius: '1rem', boxShadow: '0 4px 15px var(--shadow-light)' }}
            onClick={() => { setShowData(true); fetchData(); }}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Show COVID-19 Data'}
          </button>
        )}
        {showData && (
          <>
            {loading && <div>Loading WHO data...</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {!loading && !error && topCountries.length === 0 && <div>No WHO data available.</div>}
            <div className="features-grid">
              {topCountries.map((row, idx) => (
                <div key={idx} className="feature-card" style={{ height: '100%' }}>
                  <div className="feature-card-content">
                    <div className="feature-icon-container feature-gradient-green" style={{ marginBottom: 0, marginTop: 8 }}>
                      <span role="img" aria-label="virus" style={{ fontSize: '1.5rem', color: 'white' }}>🦠</span>
                    </div>
                    <h3 className="feature-title" style={{ fontSize: '1.1rem' }}>{row.country}</h3>
                    <p className="feature-description" style={{ fontSize: '0.98rem', margin: '8px 0' }}>
                      <strong>New Cases:</strong> {row.newCases.toLocaleString()}<br />
                      <strong>Total Cases:</strong> {row.totalCases.toLocaleString()}<br />
                      <strong>New Deaths:</strong> {row.newDeaths.toLocaleString()}<br />
                      <strong>Total Deaths:</strong> {row.totalDeaths.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default WHOSection; 